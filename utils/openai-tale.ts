// openai-tale.ts
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export async function OpenAITaleGenerator(age: number, name: string, role: string, theme: string, locale: string) {
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

  const contentMessages = {
    en: `Generate a short (no more than three paragraphs) bedtime story / fantasy tale for a ${age} year old named ${name}, who is a ${role}, and the theme is ${theme}.`,
    no: `Generer en kort (ikke mer enn tre avsnitt) sengetid historie / fantasy fortelling for en ${age} år gammel kalt ${name}, som er en ${role}, og temaet er ${theme}.`,
    fr: `Générer une histoire courte (pas plus de trois paragraphes) histoire du coucher / conte fantastique pour un enfant de ${age} ans nommé ${name}, qui est un ${role}, et le thème est ${theme}.`,
    ar: `أنشئ قصة قصيرة (لا تزيد عن ثلاث فقرات) قصة للنوم / حكاية خيالية لطفل عمره ${age} سنة يُدعى ${name}، وهو ${role}، والموضوع هو ${theme}.`,
    es: `Genera una historia corta (no más de tres párrafos) cuento para dormir / cuento de fantasía para un niño de ${age} años llamado ${name}, que es un ${role}, y el tema es ${theme}.`,
    zh: `${age}岁的${name}是一名${role}，主题是${theme}。生成一段短小的（不超过三段）睡前故事/幻想故事。`,
    sw: `Tengeneza hadithi fupi (si zaidi ya aya tatu) hadithi ya kulala / hadithi ya kufikirika kwa mtoto wa miaka ${age} anayeitwa ${name}, ambaye ni ${role}, na mada ni ${theme}.`,
    uk: `Створіть короткий (не більше трьох абзаців) вечірню казку / фантастичну історію для ${age}-річного, який називається ${name}, який є ${role}, і тема - ${theme}.`,
  };

  const contentMessage = contentMessages[locale] || contentMessages['en']; 

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: contentMessage }
      ],
      max_tokens: 3500,
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
