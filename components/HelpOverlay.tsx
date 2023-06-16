import { useState } from "react";
import { Box, Button, Flex, IconButton, useDisclosure, Heading, Text, Image, Link, Stack, AspectRatio } from "@chakra-ui/react";
import { QuestionIcon, CloseIcon } from "@chakra-ui/icons";
import ReactMarkdown from "react-markdown";
import { css, jsx } from '@emotion/react';
import Counter from "./shared/Counter"; // Import Counter


const HelpOverlay = () => {
  const { isOpen, onToggle } = useDisclosure();

  const content = `
  # StoryGen 📖

  StoryGen lar brukere generere personlige, engasjerende og kreative historier for barn. 

  ## Hvordan det fungerer

  1. **skap unike historier:** Angi en kort beskrivelse av elementene som skal inkluderes i historien, for eksempel karakterer, innstillinger, handlinger eller andre ideer.
  2. **produser en fortelling:** Ved å trykke på "Generer historie"-knappen, bruker AI-teknologien beskrivelsen til å generere en unik og engasjerende historie.
  3. **prøv lykken** Hvis du er usikker på hva du skal skrive, kan du trykke på "Jeg prøver lykken"-knappen for å fylle tekstfeltet med en tilfeldig valgt eksempeltekst, som så brukes til å generere en historie.

  ## Videre planer

  Målet er å fortsette utviklingen og implementere nye funksjoner for å forbedre brukeropplevelsen. Hver måned blir et nytt veldedig formål valgt for å bidra til. Besøk gjerne Github-siden for oppdateringer og muligheter for å bidra til prosjektet. Støtte til videreutvikling kan sendes via Vipps:
  ## Til inntekt for en god sak

  denne månaden bidrar vi til å støtte Dr. Bayan, er dette verktøyet et forsøk på å bidra til samfunnet gjennom teknologisk innovasjon. Målet er å inspirere både unge og gamle til å uttrykke sin kreativitet og nysgjerrighet.
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
          <Box bg="white" borderRadius="md" p={8} overflowY="auto" maxH="90vh">
            <ReactMarkdown 
              components={components}
            >
              {content}
            </ReactMarkdown>
            <Box 
              w="full" 
              boxShadow="" 
              rounded="md" 
              overflow="hidden" 
              mt={4}
            >
              <AspectRatio ratio={16 / 6}>
                <Link href="https://www.spleis.no/project/324720" isExternal>
                  <Image 
                    src="https://spleisprod.s3.amazonaws.com/uploads/projects/324720/324720-79f270de-91ee-4f5a-bcd6-ae0aec6cca6c-1800.webp" 
                    alt="Support Dr. Bayan" 
                    objectFit="cover"
                  />
                </Link>
              </AspectRatio>
              <Box p={4} bg="gray.100" userSelect="none">
                <Text fontWeight="bold">Hjelp den syriske legen Bayan å få utøve yrket sitt</Text>
              </Box>
            </Box>
            <Text mt={4} mb={2}>For å støtte videreutviklingen av StoryGen, kan du vudrdere å bidra med en slant:</Text>
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
              <Link href="https://github.com/lukketsvane/storygen" isExternal>
                <Image 
                  src="/github.png" 
                  alt="Github" 
                  width={140} 
                  objectFit="contain"
                />
              </Link>
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default HelpOverlay;
