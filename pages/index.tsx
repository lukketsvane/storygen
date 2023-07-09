import { useState, useEffect } from "react";
import {
  Heading,
  VStack,
  Image,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import DescriptionInput from "@/components/DescriptionInput";
import { database } from "@/firebase";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import FileUploader from "@/components/FileUploader";
import StoryOutput from "@/components/StoryOutput";
import ImagineOutput from "@/components/ImagineOutput";
import Tale from "./tale";
import { useRouter } from "next/router";
import { Link } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const Home = () => {
  const { t, i18n } = useTranslation("common");
  const [description, setDescription] = useState<string | null>("");
  const [story, setStory] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagine, setImagine] = useState<string | null>("");
  const [cancelGeneration, setCancelGeneration] = useState<boolean>(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

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

      <VStack h="100vh" pt={{ base: 0, md: 32 }} spacing={6}>
        {image ? (
          <Box w="300px" h="300px" m={2} p={0} display="flex" alignItems="center" justifyContent="center">
            <Image
              src={URL.createObjectURL(image)}
              alt="uploaded image"
              objectFit="contain"
              borderRadius="lg"
              maxW="100%"
              maxH="60%"
            />
          </Box>
        ) : (
          <Box w="300px" h="300px" m={2} pt={16} display="flex" alignItems="center" justifyContent="center">
            <Image
              src="/header.png"
              alt="header image"
              objectFit="cover"
              borderRadius="lg"
              maxW="100%"
              maxH="60%"
              onClick={onOpen}
            />
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{t('generateTale')}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Tale />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        )}

        <Heading
          alignContent={{
            base: "left",
            md: "left",
          }}
          size={{
            base: "xl",
            md: "xl",
          }}
          pt= "2"
          color="black"
        >
          {t("title")} 📖
        </Heading>

        <FileUploader
          loading={loading}
          setImage={setImage}
          setImagine={setImagine}
          setLoading={setLoading}
        />

        <DescriptionInput
          loading={loading}
          setDescription={setDescription}
          setStory={setStory}
          setLoading={setLoading}
          database={database}
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
          {t("footerText", {
            link1: (
              <Link href="https://github.com/lukketsvane" color="teal.500">
                @lukketsvane
              </Link>
            ),
            link2: "Dr. Bayan",
          })}
        </Text>
      </VStack>
    </>
  );
};

export async function getServerSideProps({ locale, req, res }) {
  // Check the 'Host' header to determine if the request comes from 'storygen.no' or 'www.storygen.no'
  const host = req.headers.host;

  if (host === 'storygen.no' || host === 'www.storygen.no') {
    // If the locale is not 'no', redirect to '/no'
    if (locale !== 'no') {
      res.writeHead(302, { Location: '/no' });
      res.end();
    }
  }
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;
