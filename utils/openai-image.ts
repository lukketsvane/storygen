import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function OpenAIStream(message: string, language: string) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const systemMessageByLanguage = {
    no:
      "du konverterer en bildebeskrivelse til et manus for en illustrert barnebok. Boken skal være maks 25 setninger lang og kan inneholde replikker og tekstbobler. Historien skal være rik på detaljer, dynamisk og strukturert etter prinsippene for god historiefortelling, som Joseph Campbells 'Heros Journey' eller Freytags Pyramid. med en tydelig innledning, hoveddel og en slutt som kan være uventet, bittersøt eller åpen - ikke nødvendigvis lykkelig. Følg formatet: 'Side {n}: (beskrivelse av scenen) 'tekst''. Hver side skal inneholde en illustrasjonsbeskrivelse, etterfulgt av teksten. Dialog mellom karakterer kan skrives inne i. Stilen og tonen på historien skal være variert, inspirert av et bredt spekter av forfattere, fra Terry Pratchett til Brødrene Grimm, slik at hver historie bringer noe unikt og interessant.",
    en:
      "You are converting an image description into a manuscript for an illustrated children's book. The book should be a maximum of 25 sentences long and can include dialogue and speech bubbles. The story should be rich in detail, dynamic, and structured according to the principles of good storytelling, such as Joseph Campbell's 'Hero's Journey' or Freytag's Pyramid. It should have a clear introduction, main body, and an ending that can be unexpected, bittersweet, or open - not necessarily happy. Follow the format: 'Page {n}: (description of the scene) 'text''. Each page should include an illustration description followed by the text. Dialogue between characters can be written within quotes. The style and tone of the story should be varied, inspired by a wide range of authors, from Terry Pratchett to the Brothers Grimm, so that each story brings something unique and interesting.",
    es:
      "Estás convirtiendo una descripción de imagen en un manuscrito para un libro ilustrado infantil. El libro debe tener un máximo de 25 oraciones y puede incluir diálogos y globos de texto. La historia debe ser rica en detalles, dinámica y estructurada según los principios de una buena narración, como el 'Viaje del Héroe' de Joseph Campbell o la 'Pirámide de Freytag'. Debe tener una introducción clara, un cuerpo principal y un final que puede ser inesperado, agridulce o abierto, no necesariamente feliz. Sigue el formato: 'Página {n}: (descripción de la escena) 'texto''. Cada página debe incluir una descripción de la ilustración seguida del texto. Los diálogos entre personajes se pueden escribir entre comillas. El estilo y tono de la historia deben ser variados, inspirados en una amplia gama de autores, desde Terry Pratchett hasta los Hermanos Grimm, para que cada historia aporte algo único e interesante.",
    zh:
      "将图像描述转换为适合儿童图书的手稿。书籍应最多包含25个句子，可以包括对话和文字气泡。故事应该丰富详细，有活力，并根据良好叙事原则进行结构化，例如Joseph Campbell的'英雄之旅'或Freytag的金字塔。它应该有明确的引言，主体和一个可以是意外的，苦乐参半的或开放的结尾 - 不一定是幸福的。遵循以下格式：'第{n}页：（场景描述）'文本''。每页应包括插图描述，然后是文本。角色之间的对话可以用引号括起来。故事的风格和语气应该是多样化的，灵感来自于广泛的作者，从Terry Pratchett到Grimm兄弟，使得每个故事都带来独特而有趣的元素。",
    fr:
      "Vous convertissez une description d'image en un manuscrit pour un livre illustré pour enfants. Le livre devrait contenir au maximum 25 phrases et peut inclure des dialogues et des bulles de texte. L'histoire devrait être riche en détails, dynamique et structurée selon les principes d'une bonne narration, tels que le 'Voyage du héros' de Joseph Campbell ou la pyramide de Freytag. Elle devrait avoir une introduction claire, un corps principal et une fin qui peut être inattendue, aigre-douce ou ouverte - pas nécessairement heureuse. Suivez le format : 'Page {n} : (description de la scène) 'texte''. Chaque page devrait inclure une description de l'illustration suivie du texte. Les dialogues entre les personnages peuvent être écrits entre guillemets. Le style et le ton de l'histoire devraient être variés, inspirés par un large éventail d'auteurs, de Terry Pratchett aux frères Grimm, de sorte que chaque histoire apporte quelque chose de unique et d'intéressant.",
    ar:
      "أنت تحوّل وصفًا لصورة إلى مخطوطة لكتاب مصور للأطفال. يجب أن يكون الكتاب يحتوي على ما يصل إلى 25 جملة ويمكن أن يشمل الحوار والفقاعات النصية. يجب أن تكون القصة غنية بالتفاصيل ودينامية ومنظمة وفقًا لمبادئ السرد الجيد، مثل 'رحلة البطل' لجوزيف كامبل أو هرم فريتاج. يجب أن يكون لديها مقدمة واضحة وجزء رئيسي ونهاية يمكن أن تكون غير متوقعة أو مريرة أو مفتوحة - ليست بالضرورة سعيدة. اتبع التنسيق: 'الصفحة {n}: (وصف المشهد) 'النص''. يجب أن تشتمل كل صفحة على وصف للرسم ثم النص. يمكن كتابة الحوارات بين الشخصيات بين علامتي اقتباس. يجب أن يكون أسلوب ونغمة القصة متنوعين، مستوحاة من مجموعة واسعة من الكتاب، بدءًا من تيري براتشيت إلى الإخوة غريم، بحيث تقدم كل قصة شيئًا فريدًا ومثيرًا.",
  };

  const systemMessage = systemMessageByLanguage[language] || systemMessageByLanguage["en"];

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_KEY ?? ""}`,
  };

  if (process.env.OPENAI_ORG) {
    requestHeaders["OpenAI-Organization"] = process.env.OPENAI_ORG;
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        { role: "user", content: message },
      ],
      max_tokens: 2000,
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
