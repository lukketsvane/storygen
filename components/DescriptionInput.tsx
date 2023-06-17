import { FormEventHandler, useState, useRef, SetStateAction, Dispatch } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, HStack, Wrap, WrapItem } from "@chakra-ui/react";
import HelpOverlay from "./HelpOverlay";
import incrementStoryCount from "./shared/incrementStoryCount";

type DescriptionInputProps = {
  loading: boolean;
  setDescription: Dispatch<SetStateAction<string | null>>;
  setStory: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const DescriptionInput = ({
  loading,
  setDescription,
  setStory,
  setLoading,
}: DescriptionInputProps) => {
  const [input, setInput] = useState("");
  const cancelGeneration = useRef(false);
  const examples = ['Frøken Frosk hopper høyere enn noen annen i skogen, og hver gang hun lander, skaper hun en miniatyrregnstorm med plaskene.', 'Herr Harepus har ører så lange at de rekker til skyene, og noen ganger må han bøye seg for ikke å henge fast i stjernene.', 'Lille Papegøye er så fargerik at en regnbue virker grå i sammenligning, og hver gang hun flyr, etterlater hun en sti av gnistrende farger.', 'Sir Skilpadde er så treg at han bruker en hel dag på å krysse veien, men han har alltid tid til å stoppe og hjelpe noen som trenger det.', 'Frøken Flamingo har bein så tynne som spaghetti, men hun kan balansere på ett bein lengre enn noen annen i dammen.', 'Herr Elefant har en snabel så stor at han kan bruke den som et periskop, og se over trærne selv når han ligger på magen.', 'Frøken Panda elsker å klatre så høyt at hun kan kikke rett inn i solnedgangen, og hun lager trærne til sine egne private lekeplasser.', 'Sir Pinnsvin er så liten at han kan gjemme seg i et eikenøtteskall, men han har en venn i hver eneste krok av skogen.', 'Kaptein Delfin elsker å svømme så raskt at hun skaper bølger store nok til å surfe på, og hun lar alltid havets musikk guide veien hennes.'];

  const handleInput: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    cancelGeneration.current = false;

    if (!input.trim()) return;

    setLoading(true);
    setDescription(input);

    const res = await fetch("/api/storygen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: input }),
    });

    if (res.body) {
      const reader = res.body.getReader();
      let story = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done || cancelGeneration.current) {
          break;
        }

        const chunk = new TextDecoder().decode(value);
        story += chunk;

        setStory(story);
      }
    }

    if (!cancelGeneration.current) {
      setLoading(false);
      await incrementStoryCount();
    }
  };

  const handleCancel: FormEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    cancelGeneration.current = true;
    setLoading(false);
  }

  const handleLuck: FormEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    setInput(randomExample);
  }

  return (
    <Box
      as="form"
      onSubmit={handleInput}
      w={{
        base: "full",
        md: "60%",
      }}
      px={{ base: 4, md: 0 }}
    >
      <VStack spacing={4}>
        <FormControl id="description">
          <FormLabel color='gray' w="100%" px={0} pb={1}>Dette er et eksperiment i kunstig intelligens for å tilgjengeliggjøre fortellinger. Beskriv noen elementer og AIen gjøre det om til en fortelling i sanntid</FormLabel>
          <Textarea
            isRequired
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Skriv inn beskrivelsen for barneboken"
            fontFamily="Courier New"
          />
        </FormControl>
        <Wrap justify="center" spacing={4}>
          <WrapItem>
            <Button
              colorScheme="teal"
              isLoading={loading}
              loadingText="Genererer ..."
              type="submit"
            >
              Generer historie
            </Button>
          </WrapItem>
          <WrapItem>
            {!loading ? (
              <Button onClick={handleLuck}>
                Jeg prøver lykken
              </Button>
            ) : (
              <Button onClick={handleCancel}>
                Kanseller
              </Button>
            )}
          </WrapItem>
        </Wrap>
      </VStack>
      <HelpOverlay />
    </Box>
  );
};

export default DescriptionInput;
