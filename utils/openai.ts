import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

export async function OpenAIStream(message: string) {
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

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: 
            "Basert på gitt BESKRIVELSE, skriv et manus for en illustrert barnebok. Boken skal være maks 25 setninger lang og kan inneholde replikker og tekstbobler. Historien skal være rik på detaljer, dynamisk og strukturert etter prinsippene for god historiefortelling, som Joseph Campbells 'Heros Journey' eller Freytags Pyramid. med en tydelig innledning, hoveddel og en slutt som kan være uventet, bittersøt eller åpen - ikke nødvendigvis lykkelig. Følg formatet; 'Side {n}: (beskrivelse av scenen) 'tekst''. Hver side skal inneholde en illustrasjon beskrivelse, etterfulgt av teksten. Dialog mellom karakterer kan skrives inne i tekstbobler. Stilen og tonen på historien skal være variert, inspirert av et bredt spekter av forfattere, fra terry pratchett til brødrene grimm, slik at hver historie bringer noe unikt og interessant."
        },
        { role: "user", content: message },
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
