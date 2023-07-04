import { useState, useEffect } from "react";
import { Heading, VStack, Image, Link, Text, Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import DescriptionInput from "@/components/DescriptionInput";
import { database } from "@/firebase";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FileUploader from "@/components/FileUploader";
import StoryOutput from "@/components/StoryOutput";
import ImagineOutput from "@/components/ImagineOutput";
import { useRouter } from "next/router";

export default function Home() {
  const { t, i18n } = useTranslation("common");
  const [description, setDescription] = useState<string | null>("");
  const [story, setStory] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagine, setImagine] = useState<string | null>(null);
  const [cancelGeneration, setCancelGeneration] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const { locale } = router;
    if (locale !== i18n.language) {
      changeLanguage(locale);
    }
  }, [router.locale]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    router.replace(router.asPath, router.asPath, { locale: lng });
  };

  return (
    <>
      <NextSeo title={t("title")} description={t("description")} />
      
      <VStack h="100vh" pt={{ base: 8, md: 32 }} spacing={6}>
      {image ? (
  <Box w="300px" h="300px" m={2} p={0} display="flex" alignItems="center" justifyContent="center">
    <Image 
      src={URL.createObjectURL(image)}
      alt="uploaded image"
      objectFit="contain"
      borderRadius="lg"
      maxW="100%"
      maxH="100%"
    />
  </Box>
) : (
  <Box w="300px" h="300px" m={2} p={0} display="flex" alignItems="center" justifyContent="center">
    <Link href="https://www.spleis.no/project/324720">
      <Image 
        src="/header.png" 
        alt="header image" 
        objectFit="cover" 
        borderRadius="lg"
        maxW="100%"
        maxH="100%"
      />
    </Link>
  </Box>
)}

      <Box w={["30%", "20%"]} m={2} px={20}>
                <FileUploader
                  loading={loading}
                  setImage={setImage}
                  setImagine={setImagine}
                  setLoading={setLoading}
                />
              </Box>
        <Heading
          alignContent={{
            base: "left",
            md: "left",
          }}
          size={{
            base: "xl",
            md: "xl",
          }}
          color="black"
        >
          {t("title")} 📖
        </Heading>
        
        <DescriptionInput
          loading={loading}
          setDescription={setDescription}
          setStory={setStory}
          setLoading={setLoading}
          firebase={database}
        />

        {/* Output component */}
        {image && !story && (
          <ImagineOutput image={image} imagine={imagine} loading={loading} />
        )}
        {story && (
          <StoryOutput
            description={description}
            story={story}
            loading={loading}
            cancelGeneration={cancelGeneration}
          />
        )}

        <Text color="gray.500" textAlign="center">
          {t("footer")}
        </Text>
      </VStack>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
