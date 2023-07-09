import { OpenAIStreamReplica } from "@/utils/openai-replica";

const MODEL_ID =
  "c4c54e3c8c97cd50c2d2fec9be3b6065563ccf7d43787fb99f84151b867178fe";
const API_KEY = process.env.REPLICATE_KEY;

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const { image } = body;

  let language = "en"; // Default language is English

  const referer = req.headers.get("referer");
  if (referer) {
    if (referer.endsWith("/es")) {
      language = "es"; // Set language to Spanish
    } else if (referer.endsWith("/fr")) {
      language = "fr"; // Set language to French
    } else if (referer.endsWith("/ar")) {
      language = "ar"; // Set language to Arabic
    } else if (referer.endsWith("/no")) {
      language = "no"; // Set language to Norwegian
    } else if (referer.endsWith("/zh")) {
      language = "zh"; // Set language to Chinese
    }
  }

  console.log("Starting diffusion");

  const explainImage = await fetch("https://api.replicate.com/v1/predictions", {
    body: JSON.stringify({
      version: MODEL_ID,
      input: { img: image, prompt: "Explain this picture in detail." },
    }),
    headers: {
      Authorization: `Token ${API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  const explanationRes = await explainImage.json();

  console.log("Got response from Replicate: ", explainImage);

  // We're waiting with a timeout because the model takes a while to generate
  // You can also set up a database + WebSocket to get notified when the model is done
  // But while that's better, it might be too complex for a small project
  await new Promise((resolve) => setTimeout(resolve, 14000));

  console.log("Getting diffusion");

  const getExplanation = await fetch(explanationRes.urls.get, {
    headers: {
      Authorization: `Token ${API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const explanationFinished = await getExplanation.json();
  const output = explanationFinished.output.join(" ");

  console.log("Got diffusion: ", output.length);

  const stream = await OpenAIStreamReplica(output, language); // Pass the language to the OpenAIStreamReplica function
  return new Response(stream);
};

export default handler;
