import { OpenAIStream } from "@/utils/openai";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const { description, language } = body; // Add language to the request body

  const stream = await OpenAIStream(description, language); // Pass the language to the OpenAIStream function
  return new Response(stream);
};

export default handler;
