import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export async function OpenAIStreamReplica(message: string, locale: string) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_KEY ?? ""}`,
  };

  if (process.env.OPENAI_ORG) {
    requestHeaders["OpenAI-Organization"] = process.env.OPENAI_ORG;
  }

  const descriptionMessages = {
    no: "Du har fått en beskrivelse på engelsk. Oversett denne beskrivelsen til norsk og bruk den som grunnlag for å skrive et manus for en illustrert barnebok på norsk. Boken skal være maksimalt 25 setninger lang, og kan inneholde dialog og talebobler. Din historie skal være rik på detaljer, dynamisk, og følge prinsippene for god historiefortelling. Følg formatet: 'Side {n}: (scenebeskrivelse) 'tekst''. Hver side skal inneholde en beskrivelse av illustrasjonen etterfulgt av teksten.",
    en: "You have received a description in English. Use this description as a basis to write a script for an illustrated children's book in English. The book should be a maximum of 25 sentences long and can contain dialogue and speech bubbles. Your story should be rich in detail, dynamic, and follow the principles of good storytelling. Follow the format: 'Page {n}: (scene description) 'text''. Each page should contain a description of the illustration followed by the text.",
    es: "Has recibido una descripción en inglés. Traduce esta descripción al español y utilízala como base para escribir un guion para un libro infantil ilustrado en español. El libro debe tener un máximo de 25 frases y puede contener diálogos y globos de texto. Tu historia debe ser rica en detalles, dinámica y seguir los principios de una buena narración. Sigue el formato: 'Página {n}: (descripción de la escena) 'texto''. Cada página debe contener una descripción de la ilustración seguida del texto.",
    zh: "你收到了一份英文描述。将此描述翻译成中文，并以此为基础，编写一本图画儿童书的剧本。书的长度最多为25个句子，可以包含对话和对白气泡。你的故事应该细节丰富，动态生动，并遵循良好的叙事原则。遵循以下格式：'第{n}页：(场景描述)'文本''。每页都应该包含一个插图的描述，然后是文本。",
    fr: "Vous avez reçu une description en anglais. Traduisez cette description en français et utilisez-la comme base pour écrire un scénario pour un livre illustré pour enfants en français. Le livre doit comporter un maximum de 25 phrases et peut contenir des dialogues et des bulles de parole. Votre histoire doit être riche en détails, dynamique et suivre les principes de la bonne narration. Suivez le format : 'Page {n} : (description de la scène) 'texte''. Chaque page doit contenir une description de l'illustration suivie du texte.",
    ar: "لقد تلقيت وصفًا باللغة الإنجليزية. قم بترجمة هذا الوصف إلى العربية واستخدمه كأساس لكتابة نص لكتاب مصور للأطفال باللغة العربية. يجب أن يكون الكتاب مكونًا من 25 جملة كحد أقصى ويمكن أن يحتوي على حوار وفقاعات الكلام. يجب أن تكون قصتك غنية بالتفاصيل وديناميكية وتتبع مبادئ الرواية الجيدة. اتبع التنسيق: 'الصفحة {n}: (وصف المشهد) 'النص''. يجب أن تحتوي كل صفحة على وصف للرسم التوضيحي يليه النص."
  };

  const descriptionMessage = descriptionMessages[locale] || descriptionMessages['en']; 

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo-16k",
      messages: [
        { role: "system", content: descriptionMessage },
        { role: "user", content: message },
      ],
      max_tokens: 10000,
      stream: true,
    }),
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            console.log("DONE");
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || "";
            if (counter < 2 && (text.match(/\n/) || []).length) {
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            controller.error(e);
          }
        }
      }

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
