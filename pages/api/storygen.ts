
import { OpenAIStream } from "@/utils/openai";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const { description, locale } = body;

  const stream = await OpenAIStream(description, locale);
  return new Response(stream);
};

export default handler;
