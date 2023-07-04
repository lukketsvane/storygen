import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function OpenAIStream(message: string, language: string) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const contentMessage = {
    no: "Basert på gitt BESKRIVELSE, skriv et manus for en illustrert barnebok. Boken skal være maks 25 setninger lang og kan inneholde replikker og tekstbobler. Historien skal være rik på detaljer, dynamisk og strukturert etter prinsippene for god historiefortelling, som Joseph Campbells 'Heros Journey' eller Freytags Pyramid. med en tydelig innledning, hoveddel og en slutt som kan være uventet, bittersøt eller åpen - ikke nødvendigvis lykkelig.  Følg formatet; 'Side {n}: (beskrivelse av scenen) 'tekst''. Hver side skal inneholde en illustrasjon beskrivelse, etterfulgt av teksten. Dialog mellom karakterer kan skrives inne i. Stilen og tonen på historien skal være variert, inspirert av et bredt spekter av forfattere, fra terry pratchett til brødrene grimm, slik at hver historie bringer noe unikt og interessant.",
    es: "Basándote en la DESCRIPCIÓN dada, escribe un guion para un libro infantil ilustrado. El libro debe tener un máximo de 25 frases y puede incluir diálogos y globos de texto. La historia debe ser rica en detalles, dinámica y estructurada según los principios de una buena narrativa, como 'El viaje del héroe' de Joseph Campbell o la Pirámide de Freytag, con una introducción clara, una parte principal y un final que puede ser inesperado, agridulce o abierto, no necesariamente feliz. Sigue el formato; 'Página {n}: (descripción de la escena) 'texto''. Cada página debe contener una descripción de la ilustración, seguida del texto. El diálogo entre personajes puede ser escrito en el interior. El estilo y el tono de la historia deben ser variados, inspirados por una amplia gama de autores, desde Terry Pratchett hasta los hermanos Grimm, de modo que cada historia aporte algo único e interesante.",
    ar: "استنادًا إلى الوصف المعطى، اكتب نصًا لكتاب أطفال مصور. يجب ألا يتجاوز الكتاب 25 جملة، ويمكن أن يتضمن حوارات وفقاعات كلام. يجب أن تكون القصة غنية بالتفاصيل وديناميكية ومنظمة وفقًا لمبادئ الرواية الجيدة، مثل 'رحلة البطل' لجوزيف كامبل أو هرم فرايتاج، مع مقدمة واضحة، جزء رئيسي ونهاية يمكن أن تكون غير متوقعة، مريرة أو مفتوحة - ليست بالضرورة سعيدة. اتبع النموذج؛ 'الصفحة {n}: (وصف المشهد) 'النص''. يجب أن تحتوي كل صفحة على وصف للرسم التوضيحي، يتبعه النص. يمكن كتابة الحوار بين الشخصيات داخل النص. يجب أن يكون أسلوب ونغمة القصة متنوعين، مستوحى من مجموعة واسعة من الكتّاب، من تيري براتشيت إلى الأخوين غريم، بحيث تقدم كل قصة شيئًا فريدًا ومثيرًا للاهتمام.",
    fr: "Sur la base de la DESCRIPTION donnée, écrivez un scénario pour un livre d'images pour enfants. Le livre doit compter un maximum de 25 phrases et peut inclure des dialogues et des bulles de parole. L'histoire doit être riche en détails, dynamique et structurée selon les principes de la bonne narration, comme le 'Voyage du héros' de Joseph Campbell ou la Pyramide de Freytag, avec une introduction claire, une partie principale et une fin qui peut être inattendue, douce-amère ou ouverte - pas nécessairement heureuse. Suivez le format ; 'Page {n} : (description de la scène) 'texte''. Chaque page doit contenir une description de l'illustration, suivie du texte. Le dialogue entre les personnages peut être écrit à l'intérieur. Le style et le ton de l'histoire doivent varier, inspirés par un large éventail d'auteurs, de Terry Pratchett aux frères Grimm, de sorte que chaque histoire apporte quelque chose d'unique et intéressant.",
    default: "Based on the given DESCRIPTION, write a script for an illustrated children's book. The book should be a maximum of 25 sentences long and can include dialogues and speech bubbles. The story should be rich in detail, dynamic and structured according to principles of good storytelling, such as Joseph Campbell's 'Hero's Journey' or Freytag's Pyramid, with a clear introduction, main part and an ending that can be unexpected, bittersweet, or open - not necessarily happy. Follow the format; 'Page {n}: (description of the scene) 'text''. Each page should contain an illustration description, followed by the text. Dialogue between characters can be written inside. The style and tone of the story should vary, inspired by a wide range of authors, from Terry Pratchett to the Brothers Grimm, so that each story brings something unique and interesting.",
  }[language] || "This is a description for a children's book.";

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
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: contentMessage },
        { role: "user", content: message },
      ],
      max_tokens: 2500,
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
