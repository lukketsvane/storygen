import React from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  useDisclosure,
  Heading,
  Text,
  Image,
  Link,
  AspectRatio,
  useBreakpointValue,
  UnorderedList,
  ListItem,
  HStack,
  Divider,
  Tooltip,
} from "@chakra-ui/react";
import {
  QuestionIcon,
  CloseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";
import Counter from "./shared/Counter";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";

const HelpOverlay = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { t } = useTranslation("common");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [currentPage, setCurrentPage] = React.useState("main");

  const handleSalesTermsClick = (event) => {
    event.stopPropagation();
    setCurrentPage("page1");
  };

  const handleArrowLeftClick = () => {
    setCurrentPage((prevPage) => {
      if (prevPage === "main") {
        return "page2";
      } else if (prevPage === "page2") {
        return "page1";
      } else if (prevPage === "page1") {
        return "main";
      }
    });
  };

  const handleArrowRightClick = () => {
    setCurrentPage((prevPage) => {
      if (prevPage === "main") {
        return "page1";
      } else if (prevPage === "page1") {
        return "page2";
      } else if (prevPage === "page2") {
        return "main";
      }
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      handleArrowLeftClick();
    } else if (event.key === "ArrowRight") {
      handleArrowRightClick();
    } else if (event.key === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const renderPageContent = () => {
    switch (currentPage) {
      case "main":
        return (
          <>
            <Heading size="xl" mt={6} mb={4}>
              {t("storyGenTitle")}
            </Heading>
            <Text>{t("storyGenDescription")}</Text>
            <Heading size="lg" mt={6} mb={2}>
              {t("howItWorksTitle")}
            </Heading>
            <UnorderedList pl={4} mb={4}>
              <ListItem>{t("step1")}</ListItem>
              <ListItem>{t("step2")}</ListItem>
              <ListItem>{t("step3")}</ListItem>
            </UnorderedList>
            <Heading size="lg" mt={6} mb={2}>
              {t("futurePlansTitle")}
            </Heading>
            <Text>{t("futurePlansDescription")}</Text>
            <Heading size="lg" mt={6} mb={2}>
              {t("supportingCauseTitle")}
            </Heading>
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
            <Divider />
            <HStack spacing={12} pt={6} pb={6} justifyContent="center">
              <Link href="https://github.com/lukketsvane" isExternal>
                {t("githubLinkText")}
              </Link>
              <Text>{t("orgNumberText")}</Text>
              <Text>{t("emailText")}</Text>
              <Button
                variant="link"
                onClick={handleSalesTermsClick}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {t("salesTermsText")}
              </Button>
            </HStack>
            <HStack spacing={12} pt={6} pb={6} justifyContent="center">
              <IconButton
                colorScheme="teal"
                aria-label="Previous"
                icon={<ArrowLeftIcon />}
                onClick={handleArrowLeftClick}
                borderRadius="50%"
                disabled={!isOpen}
              />
              <IconButton
                colorScheme="teal"
                aria-label="Next"
                icon={<ArrowRightIcon />}
                onClick={handleArrowRightClick}
                borderRadius="50%"
                disabled={!isOpen}
              />
            </HStack>
          </>
        );
      case "page1":
        return <Page1 />;
      case "page2":
        return <Page2 />;
      default:
        return null;
    }
  };

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
        {isOpen && (
          <Tooltip label="Back" placement="left" openDelay={300}>
            <IconButton
              colorScheme="teal"
              aria-label="Back"
              fontSize="20px"
              icon={<ArrowLeftIcon />}
              onClick={handleArrowLeftClick}
              borderRadius="50%"
              mt={2}
              disabled={currentPage === "main"}
            />
          </Tooltip>
        )}
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
          onKeyDown={handleKeyDown}
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
            {renderPageContent()}
          </Box>
        </Box>
      )}
    </>
  );
};

export default HelpOverlay;
