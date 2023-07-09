import React from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  useDisclosure,
  Heading,
  Text,
} from "@chakra-ui/react";
import { CloseIcon, ChevronLeftIcon } from "@chakra-ui/icons";

const TermsOverlay = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const handleToggle = () => {
    onToggle();
  };

  return (
    <>
      <Flex
        position="fixed"
        bottom={5}
        right={20}
        direction="column"
        align="flex-end"
        zIndex={11}
      >
        <IconButton
          colorScheme="teal"
          aria-label="Help"
          fontSize="20px"
          icon={<CloseIcon />}
          onClick={handleToggle}
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
          overflowX="hidden"
          overflowY="auto"
        >
          <Box
            bg="white"
            borderRadius="md"
            p={8}
            overflowY="auto"
            maxH="90vh"
            w="100%"
            mx="auto"
          >
            <Heading size="xl" mt={6} mb={4}>
              Salgsbetingelser for StoryGen
            </Heading>

            <Heading size="lg" mt={6} mb={2}>
              01. Innledning
            </Heading>
            <Text>
              Disse vilkårene gjelder for bruk av StoryGen.no, inkludert kjøp av
              medlemskap og donasjoner, i tråd med standard salgsbetingelser for
              forbrukerkjøp over Internett og relevante norske lover. Lovene er
              tilgjengelige på{" "}
              <a href="http://www.lovdata.no/">www.lovdata.no</a>. For mer
              informasjon, se Forbrukertilsynets{" "}
              <a href="https://www.forbrukertilsynet.no/lov-og-rett/veiledninger-og-retningslinjer/veiledning-standard-salgsbetingelser-forbrukerkjop-varer-internett">
                veileder
              </a>
              .
            </Text>

            <Heading size="lg" mt={6} mb={2}>
              02. Partene
            </Heading>
            <Text>
              I disse salgsbetingelsene refererer "bruker" til enhver person som
              bruker tjenesten StoryGen via nettsiden. "Nettsiden" refererer til{" "}
              <a href="http://www.storygen.no/">www.storygen.no</a>. "Vi", "oss"
              og "vår" refererer til foretaket Iver Finne Media med
              organisasjonsnummer 919 598 107 og kontaktinformasjon som følger:
              Toftes gate 58, 0552 Oslo, e-post:{" "}
              <a href="mailto:iverfinne@gmail.com">iverfinne@gmail.com</a>,
              telefon: +47 404 60 749. Kjøper er den som foretar donasjonen
              eller kontingentbetalingen, og betegnes i det følgende som
              giver/giveren eller medlem/medlemmet.
            </Text>

            <Heading size="lg" mt={6} mb={2}>
              03. Medlemskap
            </Heading>
            <Text>
              Bruken av tjenesten StoryGen er gratis, og det er ingen krav om
              medlemskap eller betaling for å få tilgang til grunnleggende
              funksjoner. Vi tilbyr imidlertid muligheten for frivillige
              donasjoner for å støtte videreutviklingen av tjenesten veldedige
              formål. Donasjoner er frivillige og kan gis enten som en
              engangsbeløp eller som regelmessige bidrag via Vipps.
            </Text>

            <Heading size="lg" mt={6} mb={2}>
              04. Avtaleinngåelse
            </Heading>
            <Text>
              Ved å bruke tjenesten StoryGen inngår du en avtale med oss i henhold til disse salgsbetingelsene. Avtalen trer i kraft fra det tidspunktet du begynner å bruke tjenesten, og har ingen bindingstid.
            </Text>

            <Heading size="lg" mt={6} mb={2}>
              05. Donasjoner
            </Heading>
            <Text>
              Donasjoner til StoryGen-nettsiden bidrar til driftskostnader, inkludert API, domene og hosting. Alle overskudd kanaliseres til veldedige formål. Donasjoner håndteres via Vipps, som sikrer en effektiv prosess underlagt Vipps' <a href="https://vipps.no/personvern-og-vilkar/vipps-terms-and-conditions/">vilkår og betingelser</a>.
            </Text>
            <Text>
              Ved donasjon er prisen fritt valgt av kjøper og inkluderer alle avgifter og tilleggskostnader. Det oppgitte beløpet er den totale prisen kjøper skal betale. Denne prisen inkluderer alle avgifter og tilleggskostnader. Ytterligere kostnader som selger før kjøpet ikke har informert om, skal kjøper ikke bære.
            </Text>
            <Text>
              - Donasjonsprosess: Donasjoner via Vipps behandles i henhold til deres vilkår, som sikrer sikre og effektive betalinger.
            </Text>
            <Text>
              - Ingen bindingstid: Donasjoner til StoryGen er helt frivillige og det er ingen bindingstid. Donorer kan velge å stoppe sine regelmessige bidrag når som helst.
            </Text>
            <Text>
              - Ansvarsfraskrivelse: StoryGen fraskriver seg ansvar for Vipps' handlinger, politikk eller praksis. Vi anbefaler gjennomgang av Vipps' vilkår før donasjon. Oppsigelse av avtalen - hvordan avslutte avtale om faste betalinger er i henhold til Vipps med driftskostnader.
            </Text>

            <Heading size="lg" mt={6} mb={2}>
              06. Personopplysninger
            </Heading>
            <Text>
              StoryGen håndterer personopplysninger i henhold til gjeldende personvernlovgivning og vår personvernpolicy. Ved donasjon samler vi inn nødvendig informasjon for å behandle donasjonen, inkludert teknisk informasjon om din interaksjon med tjenesten.
            </Text>
            <Text>
              - Ved donasjon via Vipps, behandles betalingen din i henhold til Vipps' <a href="https://www.vipps.no/vilkar/vipps/">vilkår og betingelser</a>. Vi anbefaler at du gjennomgår Vipps' vilkår og betingelser og personvernpolicy før donasjon.
            </Text>
            <Text>
              - Eventuelle endringer publiseres på vår side, og det er ditt ansvar å holde deg oppdatert. Fortsatt bruk etter endringer aksepterer de nye betingelsene.
            </Text>

            <Text>
              Kilder:
            </Text>
            <Text>
              - <a href="https://www.forbrukertilsynet.no/wp-content/uploads/2017/12/Veiledning-til-standard-salgsbetingelser-for-forbrukerkj%C3%B8p_ny-1.pdf">Veiledning til standard salgsbetingelser for forbrukerkjøp</a>
            </Text>
            <Text>
              - <a href="https://www.vipps.no/vilkar/vipps/">Vipps Terms and Conditions</a>
            </Text>

            <Heading size="lg" mt={6} mb={2}>
              07. Oppdatering av salgsbetingelsene
            </Heading>
            <Text>
              Disse salgsbetingelsene kan uten noen forutgående varsel bli endret. Salgsbetingelsene bruker dato som versjonsnummer.
            </Text>
            <Text>
              Revidert dato (versjon): 05.07.2023
            </Text>
            <HStack spacing={5} justify="flex-end" position="absolute" bottom={5} right={0}>
              <IconButton
                colorScheme="teal"
                aria-label="Previous"
                fontSize="20px"
                icon={<ChevronLeftIcon />}
                onClick={onClose}
                borderRadius="50%"
              />
              <IconButton
                colorScheme="teal"
                aria-label="Close"
                fontSize="20px"
                icon={<CloseIcon />}
                onClick={handleToggle}
                borderRadius="50%"
              />
            </HStack>
          </Box>
        </Box>
      )}
    </>
  );
};

export default TermsOverlay;
