import { OpenAIStream } from "@/utils/openai";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const { description } = body;

  const stream = await OpenAIStream(description);
  return new Response(stream);
};

export default handler;
