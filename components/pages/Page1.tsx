import React from "react";
import { Box, Heading, Text, Link, UnorderedList, ListItem } from "@chakra-ui/react";

const Page1 = () => {
  return (
    <Box>
      <Heading as="h1" size="xl" mt={6} mb={8}>
        Salgsbetingelser for StoryGen
      </Heading>

      <Heading as="h1" size="lg" mt={6} mb={2}>
        01. Innledning
      </Heading>
      <Text>
        Disse vilkårene gjelder for bruk av StoryGen.no, inkludert kjøp av
        medlemskap og donasjoner, i tråd med standard salgsbetingelser for
        forbrukerkjøp over Internett og relevante norske lover. Lovene er
        tilgjengelige på{" "}
        <Link href="http://www.lovdata.no" isExternal>
          www.lovdata.no
        </Link>
        . For mer informasjon, se Forbrukertilsynets{" "}
        <Link
          href="https://www.forbrukertilsynet.no/lov-og-rett/veiledninger-og-retningslinjer/veiledning-standard-salgsbetingelser-forbrukerkjop-varer-internett"
          isExternal
        >
          veileder
        </Link>
        .
      </Text>

      <Heading as="h1" size="lg" mt={6} mb={2}>
        02. Partene
      </Heading>
      <Text>
        I disse salgsbetingelsene refererer "bruker" til enhver person som
        bruker tjenesten StoryGen via nettsiden. "Nettsiden" refererer til{" "}
        <Link href="http://www.storygen.no" isExternal>
          www.storygen.no
        </Link>
        . "Vi", "oss" og "vår" refererer til foretaket Iver Finne Media med
        organisasjonsnummer 919 598 107 og kontaktinformasjon som følger: Toftes
        gate 58, 0552 Oslo, e-post:{" "}
        <Link href="mailto:iverfinne@gmail.com">iverfinne@gmail.com</Link>,
        telefon: +47 404 60 749.
      </Text>

      <Heading as="h1" size="lg" mt={6} mb={2}>
        03. Medlemskap
      </Heading>
      <Text>
        Bruken av tjenesten StoryGen er gratis, og det er ingen krav om
        medlemskap eller betaling for å få tilgang til grunnleggende funksjoner.
        Vi tilbyr imidlertid muligheten for frivillige donasjoner for å støtte
        videreutviklingen av tjenesten veldedige formål. Donasjoner er frivillige
        og kan gis enten som en engangsbeløp eller som regelmessige bidrag via
        Vipps.
      </Text>

      <Heading as="h1" size="lg" mt={6} mb={2}>
        04. Avtaleinngåelse
      </Heading>
      <Text>
        Ved å bruke tjenesten StoryGen inngår du en avtale med oss i henhold til
        disse salgsbetingelsene. Avtalen trer i kraft fra det tidspunktet du
        begynner å bruke tjenesten, og har ingen bindingstid.
      </Text>

      <Heading as="h1" size="lg" mt={6} mb={2}>
        05. Donasjoner
      </Heading>
      <Text>
        Donasjoner til StoryGen-nettsiden bidrar til driftskostnader, inkludert
        API, domene og hosting. Alle overskudd kanaliseres til veldedige formål.
        Donasjoner håndteres via Vipps, som sikrer en effektiv prosess underlagt
        Vipps'{" "}
        <Link href="https://vipps.no/personvern-og-vilkar/vipps-terms-and-conditions/" isExternal>
          vilkår og betingelser
        </Link>
        .
      </Text>
      <Text>
        Ved donasjon er prisen fritt valgt av kjøper og inkluderer alle avgifter
        og tilleggskostnader. Det oppgitte beløpet er den totale prisen kjøper
        skal betale. Denne prisen inkluderer alle avgifter og tilleggskostnader.
        Ytterligere kostnader som selger før kjøpet ikke har informert om, skal
        kjøper ikke bære.
      </Text>
      <UnorderedList pl={4} mb={4}>
        <ListItem>
          Donasjonsprosess: Donasjoner via Vipps behandles i henhold til deres
          vilkår, som sikrer sikre og effektive betalinger.
        </ListItem>
        <ListItem>
          Ingen bindingstid: Donasjoner til StoryGen er helt frivillige og det
          er ingen bindingstid. Donorer kan velge å stoppe sine regelmessige
          bidrag når som helst.
        </ListItem>
        <ListItem>
          Ansvarsfraskrivelse: StoryGen fraskriver seg ansvar for Vipps'
          handlinger, politikk eller praksis. Vi anbefaler gjennomgang av Vipps'
          vilkår før donasjon. Oppsigelse av avtalen - hvordan avslutte avtale
          om faste betalinger er i henhold til Vipps med driftskostnader
        </ListItem>
      </UnorderedList>

      <Heading as="h1" size="lg" mt={6} mb={2}>
        06. Personopplysninger
      </Heading>
      <Text>
        StoryGen håndterer personopplysninger i henhold til gjeldende
        personvernlovgivning og vår personvernpolicy. Ved donasjon samler vi inn
        nødvendig informasjon for å behandle donasjonen, inkludert teknisk
        informasjon om din interaksjon med tjenesten.
      </Text>
      <Text>
        Ved donasjon via Vipps, behandles betalingen din i henhold til Vipps'{" "}
        <Link href="https://vipps.no/personvern-og-vilkar/vipps-terms-and-conditions/" isExternal>
          vilkår og betingelser
        </Link>
        . Vi anbefaler at du gjennomgår Vipps' vilkår og betingelser og
        personvernpolicy før donasjon.
      </Text>
      <Text>
        Eventuelle endringer publiseres på vår side, og det er ditt ansvar å
        holde deg oppdatert. Fortsatt bruk etter endringer aksepterer de nye
        betingelsene.
      </Text>

      <Text as="h1" size="lg" mt={6} mb={2}>
        Kilder
      </Text>
      <Text>
        -{" "}
        <Link href="https://www.forbrukertilsynet.no/wp-content/uploads/2017/12/Veiledning-til-standard-salgsbetingelser-for-forbrukerkjop_ny-1.pdf" isExternal>
          Veiledning til standard salgsbetingelser for forbrukerkjøp
        </Link>
      </Text>
      <Text>
        -{" "}
        <Link href="https://www.vipps.no/vilkar/vipps/" isExternal>
          Vipps Terms and Conditions
        </Link>
      </Text>

      <Heading as="h1" size="lg" mt={6} mb={2}>
        07. Oppdatering av salgsbetingelsene
      </Heading>
      <Text>
        Disse salgsbetingelsene kan uten noen forutgående varsel bli endret.
        Salgsbetingelsene bruker dato som versjonsnummer.
      </Text>
      <Text >Revidert dato (versjon): 05.07.2023</Text>
    </Box>
  );
};

export default Page1;
