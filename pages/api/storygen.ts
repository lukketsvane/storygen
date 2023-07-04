import { OpenAIStream } from "@/utils/openai";

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const { description } = body;

  const language = getLanguageFromRequest(req); // Get the language from the request

  const stream = await OpenAIStream(description, language); // Pass the language to the OpenAIStream function
  return new Response(stream);
};

export default handler;

function getLanguageFromRequest(req: Request): string {
  const acceptLanguage = req.headers.get("accept-language") || "";
  const languages = acceptLanguage.split(",");

  // Map the accepted languages to the supported languages of your application
  const supportedLanguages = {
    ar: "ar",
    en: "en",
    es: "es",
    fr: "fr", // Add "fr" to the supported languages
    zh: "zh",
    no: "no",
    // Add more supported languages as needed
  };

  // Iterate through the accepted languages and check if any of them match the supported languages
  for (const lang of languages) {
    const languageCode = lang.trim().split("-")[0]; // Extract the language code
    if (supportedLanguages[languageCode]) {
      return supportedLanguages[languageCode]; // Return the supported language code
    }
  }

  // If no supported language is found, fallback to a default language (e.g., English)
  return "en";
}
