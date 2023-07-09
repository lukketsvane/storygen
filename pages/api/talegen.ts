import { OpenAITaleGenerator } from "@/utils/openai-tale";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const { age, name, role, theme, locale } = body;

  const stream = await OpenAITaleGenerator(age, name, role, theme, locale);
  return new Response(stream);
};

export default handler;
