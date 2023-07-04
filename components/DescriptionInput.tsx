import { FormEventHandler, useState, useRef, SetStateAction, Dispatch } from "react";
import { Box, Button, FormControl, FormLabel, Textarea, VStack, HStack, Wrap, WrapItem } from "@chakra-ui/react";
import HelpOverlay from "./HelpOverlay";
import LanguageButton from "./LanguageButton";
import incrementStoryCount from "./shared/incrementStoryCount";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';


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
  const { t } = useTranslation(['common', 'examples']);
  const router = useRouter();
  const [input, setInput] = useState("");
  const cancelGeneration = useRef(false);
  const examples = t('examples', { returnObjects: true });

  const handleInput: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    cancelGeneration.current = false;

    if (!input.trim()) return;

    setLoading(true);
    setDescription(input);

    const res = await fetch("/api/storygen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: input, locale: router.locale }),
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
    setInput(examples[Math.floor(Math.random() * examples.length)]);
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
          <FormLabel color='gray' w="100%" px={0} pb={1}>{t('description')}</FormLabel>
          <Textarea
            isRequired
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            fontFamily="Courier New"
          />
        </FormControl>
        <Wrap justify="center" spacing={4}>
          <WrapItem>
            <Button
              colorScheme="teal"
              isLoading={loading}
              loadingText={t('generating')}
              type="submit"
            >
              {t('generate')}
            </Button>
          </WrapItem>
          <WrapItem>
            {!loading ? (
              <Button onClick={handleLuck}>
                {t('lucky')}
              </Button>
            ) : (
              <Button onClick={handleCancel}>
                {t('cancel')}
              </Button>
            )}
          </WrapItem>
        </Wrap>
      </VStack>
      <HStack spacing={5} justify="flex-end" position="absolute" top={5} right={0}>
      </HStack>
      <HelpOverlay />
      <LanguageButton />
    </Box>
    
  );
};

export default DescriptionInput;
