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

  let ageGroup;
  if (age >= 4 && age <= 7) {
    ageGroup = "young";
  } else if (age > 7 && age <= 12) {
    ageGroup = "preteen";
  } else if (age > 12 && age <= 18) {
    ageGroup = "teen";
  } else {
    ageGroup = "adult";
  }

  const prompts = {
    young: {
      en: `Generate a simple and enchanting bedtime story suitable for ages 4-7 with emojis, for a ${age} year old named ${name}, who is a ${role}, and the theme is ${theme}.`,
      no: `Generer en enkel og fortryllende sengetid historie egnet for alderen 4-7 med emojis, for en ${age} år gammel kalt ${name}, som er en ${role}, og temaet er ${theme}.`,
      fr: `Générer une histoire du coucher simple et enchantée appropriée pour les 4-7 ans avec des emojis, pour un enfant de ${age} ans nommé ${name}, qui est un ${role}, et le thème est ${theme}.`,
      ar: `أنشئ قصة نوم بسيطة وساحرة ملائمة للأعمار من 4-7 مع الرموز التعبيرية، لطفل عمره ${age} سنة يُدعى ${name}، وهو ${role}، والموضوع هو ${theme}.`,
      es: `Genera una historia para dormir simple y encantadora adecuada para edades de 4-7 con emojis, para un niño de ${age} años llamado ${name}, que es un ${role}, y el tema es ${theme}.`,
      zh: `为一名${age}岁的${name}生成一段适合4-7岁儿童的、使用表情符号的、简单而迷人的睡前故事，他/她是一个${role}，主题是${theme}。`,
      sw: `Tengeneza hadithi rahisi na ya kuvutia ya kulala inayofaa kwa umri wa miaka 4-7 na emojis, kwa mtoto wa miaka ${age} anayeitwa ${name}, ambaye ni ${role}, na mada ni ${theme}.`,
      uk: `Створіть просту та чарівну вечірню казку, підходящу для віку 4-7 років з емодзі, для ${age}-річного, який називається ${name}, який є ${role}, і тема - ${theme}.`,
    },
    preteen: {
      en: `Create a thrilling and engaging bedtime adventure story for a ${age} year old named ${name}, who is a ${role}, and the theme is ${theme}.`,
      no: `Lag en spennende og engasjerende sengetidseventyrhistorie for en ${age} år gammel kalt ${name}, som er en ${role}, og temaet er ${theme}.`,
      fr: `Créez une histoire d'aventure pour le coucher passionnante et engageante pour un enfant de ${age} ans nommé ${name}, qui est un ${role}, et le thème est ${theme}.`,
      ar: `أنشئ قصة مغامرة مثيرة ومشوقة للنوم لطفل عمره ${age} سنة يُدعى ${name}، وهو ${role}، والموضوع هو ${theme}.`,
      es: `Crea una historia de aventuras para dormir emocionante e interesante para un niño de ${age} años llamado ${name}, que es un ${role}, y el tema es ${theme}.`,
      zh: `为一名${age}岁的${name}创建一个激动人心和引人入胜的睡前冒险故事，他/她是一个${role}，主题是${theme}。`,
      sw: `Tengeneza hadithi ya kusisimua na ya kuvutia ya kulala kwa mtoto wa miaka ${age} anayeitwa ${name}, ambaye ni ${role}, na mada ni ${theme}.`,
      uk: `Створіть захоплюючу та захоплюючу вечірню пригодницьку історію для ${age}-річного, який називається ${name}, який є ${role}, і тема - ${theme}.`,    
    },
    teen: {
      en: `Craft an exciting and immersive fantasy tale for a ${age} year old named ${name}, who is a ${role}, and the theme is ${theme}.`,
      no: `Lag en spennende og innlevende fantasyfortelling for en ${age} år gammel kalt ${name}, som er en ${role}, og temaet er ${theme}.`,
      fr: `Confectionnez un conte fantastique passionnant et immersif pour un adolescent de ${age} ans nommé ${name}, qui est un ${role}, et le thème est ${theme}.`,
      ar: `صاغ قصة خيالية مثيرة وغامرة لمراهق عمره ${age} سنة يُدعى ${name}، وهو ${role}، والموضوع هو ${theme}.`,
      es: `Elabore un cuento de fantasía emocionante e inmersivo para un adolescente de ${age} años llamado ${name}, que es un ${role}, y el tema es ${theme}.`,
      zh: `为一名${age}岁的${name}精心打造一个令人兴奋且身临其境的幻想故事，他/她是一个${role}，主题是${theme}。`,
      sw: `Tengeneza hadithi ya kusisimua na ya kuzama ya kufikirika kwa kijana wa miaka ${age} anayeitwa ${name}, ambaye ni ${role}, na mada ni ${theme}.`,
      uk: `Створіть захоплюючу та занурюючу фантастичну історію для ${age}-річного підлітка, який називається ${name}, який є ${role}, і тема - ${theme}.`,    
    },
    adult: {
      en: `Compose an engaging and intricate fantasy tale for an adult aged ${age} named ${name}, who is a ${role}, and the theme is ${theme}.`,
      no: `Komponer en engasjerende og intrikat fantasyfortelling for en voksen på ${age} år kalt ${name}, som er en ${role}, og temaet er ${theme}.`,
      fr: `Composez un conte fantastique complexe et captivant pour un adulte de ${age} ans nommé ${name}, qui est un ${role}, et le thème est ${theme}.`,
      ar: `أنشئ قصة خيالية معقدة وجذابة لبالغ عمره ${age} سنة يُدعى ${name}، وهو ${role}، والموضوع هو ${theme}.`,
      es: `Elabore un cuento de fantasía complejo y atractivo para un adulto de ${age} años llamado ${name}, que es un ${role}, y el tema es ${theme}.`,
      zh: `为一名${age}岁的${name}成人构思一篇引人入胜且错综复杂的幻想故事，他/她是一个${role}，主题是${theme}。`,
      sw: `Tunga hadithi ya kufikirika ya kuvutia na ngumu kwa mtu mzima wa miaka ${age} anayeitwa ${name}, ambaye ni ${role}, na mada ni ${theme}.`,
      uk: `Створіть захоплюючу та складну фантастичну історію для дорослого ${age} років, який називається ${name}, який є ${role}, і тема - ${theme}.`,
    
    },
  }

  const contentMessage = prompts[ageGroup][locale] || prompts[ageGroup]['en']; 

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
