import { Box, Button, Flex, IconButton, useDisclosure, Heading, Text, Image, Link, AspectRatio, useBreakpointValue, UnorderedList, ListItem } from "@chakra-ui/react";
import { QuestionIcon, CloseIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";
import Counter from "./shared/Counter";

const HelpOverlay = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { t } = useTranslation("common");
  const isMobile = useBreakpointValue({ base: true, md: false });

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
          overflowX="hidden"
          overflowY="auto"
        >
          <Box
            bg="white"
            borderRadius="md"
            p={8}
            overflowY="auto"
            maxH="90vh"
            w={isMobile ? "100vw" : "60%"}
            mx={isMobile ? 0 : "auto"}
          >
            <Heading size="xl" mt={6} mb={4}>{t("storyGenTitle")}</Heading>

            <Text>{t("storyGenDescription")}</Text>

            <Heading size="lg" mt={6} mb={2}>{t("howItWorksTitle")}</Heading>
            <UnorderedList pl={4} mb={4}>
              <ListItem>{t("step1")}</ListItem>
              <ListItem>{t("step2")}</ListItem>
              <ListItem>{t("step3")}</ListItem>
            </UnorderedList>

            <Heading size="lg" mt={6} mb={2}>{t("futurePlansTitle")}</Heading>
            <Text>{t("futurePlansDescription")}</Text>

            <Heading size="lg" mt={6} mb={2}>{t("supportingCauseTitle")}</Heading>
            <Text>{t("supportingCauseDescription")}</Text>

            <Box w="full" boxShadow="" rounded="md" overflow="hidden" mt={4}>
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
                <Text fontWeight="bold">{t("supportingCauseText")}</Text>
              </Box>
            </Box>

            <Text mt={4} mb={2}>
              {t("generatedCountText")} <Counter /> {t("supportDevelopmentText")}
            </Text>

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
