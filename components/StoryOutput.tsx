import { Box, Stack, IconButton, useClipboard, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck } from '@fortawesome/free-solid-svg-icons';
import LoadingText from "./LoadingText";

type StoryOutputProps = {
  description: string | null;
  story: string | null;
  loading: boolean;
  cancelGeneration: boolean;
};

const DefaultStory = '';

const StoryOutput = ({ description, story, loading, cancelGeneration }: StoryOutputProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [copied, setCopied] = useState(false);
  const { onCopy } = useClipboard(story || '');
  const toast = useToast();

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;

    if (Math.abs(scrollPos - currentScrollPos) > 100) {
      setIsUserScrolling(true);
      document.removeEventListener('scroll', handleScroll);
    }

    setScrollPos(currentScrollPos);
  }

  useEffect(() => {
    if (loading && !isUserScrolling && !cancelGeneration) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [story, loading, isUserScrolling, cancelGeneration]);

  useEffect(() => {
    if (loading) {
      setScrollPos(window.pageYOffset);
      document.addEventListener('scroll', handleScroll);
      return () => {
        document.removeEventListener('scroll', handleScroll);
      }
    } else {
      setIsUserScrolling(false);
    }
  }, [loading]);

  const formatStory = (story: string) => {
    return story.replace(/(\n\n)(?!<b style="color: black;">Side 6:<\/b>)/g, "<br />").replace(/(Side \d+:)/g, '<b style="color: black;">$1</b>');
  }

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 750);
    toast({
      title: "Kopiert",
      description: "Fortellingen er kopiert til utklippstavlen",
      status: "success",
      duration: 3000,
      isClosable: true,
      colorScheme: "teal"
    })
  }

  return (
    <Stack
      w={{
        base: "full",
        md: "60%",
      }}
      direction={{ base: "column", md: "row" }}
      px={{ base: 8, md: 0 }}
      pb={{ base: 12, md: 0 }}
    >
      <Box
        p={2}
        rounded="md"
        h="full"
        w={{ base: "full", md: "80rem" }}
      >
        {!cancelGeneration && story && <p style={{ color: "black", fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", fontWeight: "500" }} dangerouslySetInnerHTML={{ __html: formatStory(story.replace(/\n/g, "<br />")) }} />}
        {loading && !cancelGeneration && <LoadingText />}
        {!story && !loading && <p style={{ color: "white" }}>{DefaultStory}</p>}
        {story && !loading && (
          <IconButton
            mt={4}
            icon={<FontAwesomeIcon icon={copied ? faCheck : faClipboard} />}
            color={copied ? 'green.400' : 'gray.400'}
            onClick={handleCopy}
            className="transition-colors duration-200"
          />
        )}
        <div ref={endRef} />
      </Box>
    </Stack>
  );
};

export default StoryOutput;
