import { useState } from "react";
import { Heading, VStack, Image, Link, Text, Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import DescriptionInput from "@/components/DescriptionInput";
import StoryOutput from "@/components/StoryOutput";
import { database } from '@/firebase';

export default function Home() {
  const [description, setDescription] = useState<string | null>("");
  const [story, setStory] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <NextSeo
        title="StoryGen"
        description="En tjeneste for å generere barnas bokmanus basert på en beskrivelse"
      />
      <VStack h="100vh" pt={{ base: 8, md: 32 }} spacing={6}>
        <Box w={["40%", "20%"]} m={2} p={0}>
          <Link href="https://www.spleis.no/project/324720">
            <Image 
              src="/header.png" 
              alt="header image" 
              objectFit="cover" 
              borderRadius="lg"
              shadow="sm"
            />
          </Link>
        </Box>
        <Heading
          size={{
            base: "xl",
            md: "xl",
          }}
          color="black"
        >
          StoryGen 📖
        </Heading>

        <DescriptionInput
          loading={loading}
          setDescription={setDescription}
          setStory={setStory}
          setLoading={setLoading}
          database={database}
        />
        <StoryOutput description={description} story={story} loading={loading} />

        <Text color="gray.500" textAlign="center" pb='-12' mx='6' pt='-2'>
          laga av{" "}
          <Link href="https://www.spleis.no/project/324720" color="teal.500">
            @lukketsvane
          </Link>{" "}
          med kjærleik, til innsamling for{" "}
          <Link href="https://www.spleis.no/project/324720" color="teal.500">
            Dr. Bayan
          </Link>
        </Text>
      </VStack>
    </>
  );
}
