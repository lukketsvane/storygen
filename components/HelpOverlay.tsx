// HelpOverlay.tsx
import { useState } from "react";
import { Box, Button, Flex, IconButton, useDisclosure, Heading, Text, Image } from "@chakra-ui/react";
import { QuestionIcon, CloseIcon } from "@chakra-ui/icons";
import ReactMarkdown from "react-markdown";
import { css, jsx } from '@emotion/react';

const HelpOverlay = () => {
  const { isOpen, onToggle } = useDisclosure();

  const content = `
  # StoryGen 📖

  StoryGen er et unikt nettbasert verktøy som lar brukere generere personlige, engasjerende og kreative historier for barn. Med et brukervennlig grensesnitt og innovativ AI-drevet teknologi, gjør StoryGen det mulig for alle å bli en forteller.

  ## Hvordan det fungerer

  1. **Lag din egen historie**: Skriv inn en kort beskrivelse av elementene du ønsker å inkludere i historien din. For eksempel kan du inkludere karakterer, innstillinger, handlinger, eller hvilken som helst annen idé du har.
  2. **Generer fortelling**: Trykk på "Generer historie" knappen. StoryGen vil deretter bruke din beskrivelse og AI-teknologi til å generere en unik og engasjerende historie.
  3. **Jeg prøver lykken**: Hvis du er usikker på hva du skal skrive, kan du trykke på "Jeg prøver lykken" knappen. Dette vil fylle tekstfeltet med en tilfeldig valgt eksempeltekst, som StoryGen deretter vil bruke til å generere en historie.

  ## Til inntekt for en god sak

  StoryGen er utviklet av @tastefinger med kjærlighet, til inntekt for [Dr. Bayan](https://www.spleis.no/project/324720). Vi er forpliktet til å bidra til samfunnet gjennom teknologisk innovasjon, og vi håper at vårt prosjekt vil inspirere både unge og gamle til å uttrykke sin kreativitet og nysgjerrighet. 

  Gjennom StoryGen, skaper vi ikke bare historier, men også et samfunn av oppdagere, drømmere, og eventyrere. Bli med oss i dag og begynn å skape din egen unike fortelling!

  ## Videre planer

  Vi i StoryGen-teamet har store planer for fremtiden. Vi ønsker å fortsette utviklingen av dette prosjektet og implementere nye funksjoner som kan forbedre brukeropplevelsen. Hver måned velger vi et nytt veldedig formål som nettsiden bidrar til. Følg med på vår [Github-side](https://github.com/lukketsvane/storygen) for oppdateringer og bidra gjerne til prosjektet.
  `;

  const components = {
    h1: ({ ...props}) => <Heading size="xl" mt={6} mb={4}{...props} />, // For H1 headings
    h2: ({ ...props}) => <Heading size="lg" mt={6} mb={2}{...props} />, // For H2 headings
  }

  return (
    <>
      <Flex
        position="fixed"
        bottom={5}
        right={5}
        direction="column"
        align="flex-end"
        zIndex={11}
      >
        <IconButton
          colorScheme="teal"
          aria-label="Help"
          fontSize="20px"
          icon={isOpen ? <CloseIcon /> : <QuestionIcon />}
          onClick={onToggle}
          borderRadius="50%"
        />
      </Flex>

      {isOpen && (
        <Box
          position="fixed"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bg="rgba(0,0,0,0.5)"
          zIndex={10}
          p={2}
        >
          <Box bg="white" borderRadius="md" p={8} overflowY="auto" maxH="120vh">
            <ReactMarkdown 
              components={components}
            >
              {content}
            </ReactMarkdown>
            <Text mt={4} mb={2}>For å støtte videreutviklingen av StoryGen, kan du Vippse meg:</Text>
            <Button 
              as="a"
              href="#"
              mt={4}
              px={-4} 
              background="none"
              border="none"
              _hover={{ background: "none" }}
            >
              <Image 
                src="/vipps.png" 
                alt="Vipps" 
                width={140} 
                objectFit="contain"
                mr={4}
              />
              <Image 
                src="/github.png" 
                alt="Github" 
                width={140} 
                objectFit="contain"
              />
            </Button>

          </Box>
        </Box>
      )}
    </>
  );
};

export default HelpOverlay;
