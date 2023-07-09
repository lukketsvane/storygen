import { Box, Stack, IconButton, useClipboard, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faCheck } from '@fortawesome/free-solid-svg-icons';
import LoadingText from "./LoadingText";

type TaleOutputProps = {
  description: string | null;
  tale: string | null;
  loading: boolean;
  cancelGeneration: boolean;
};

const DefaultTale = '';

const TaleOutput = ({ description, tale, loading, cancelGeneration }: TaleOutputProps) => {
  const endRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [copied, setCopied] = useState(false);
  const { onCopy } = useClipboard(tale || '');
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
  }, [tale, loading, isUserScrolling, cancelGeneration]);

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

  const formatTale = (tale: string) => {
    return tale.replace(/(\n\n)/g, "<br />");
  }

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 750);
    toast({
      title: "Copied",
      description: "The tale has been copied to your clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
      colorScheme: "teal"
    })
  }

  return (
    <Stack
      w="full"
      direction={{ base: "column", md: "row" }}
      px={{ base: 8, md: 0 }}
      pb={{ base: 12, md: 0 }}
    >
      <Box
        p={2}
        rounded="md"
        h="full"
        w="full"
      >
        {!cancelGeneration && tale && <p style={{ color: "black", fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", fontWeight: "500" }} dangerouslySetInnerHTML={{ __html: formatTale(tale.replace(/\n/g, "<br />")) }} />}
        {loading && !cancelGeneration && <LoadingText />}
        {!tale && !loading && <p style={{ color: "white" }}>{DefaultTale}</p>}
        {tale && !loading && (
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

export default TaleOutput;
