import { Box, Stack } from "@chakra-ui/react";
import { useEffect, useRef } from 'react';
import LoadingText from "./LoadingText";

type StoryOutputProps = {
  description: string | null;
  story: string | null;
  loading: boolean;
};

const DefaultStory = `
`;

const StoryOutput = ({ description, story, loading }: StoryOutputProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [story, loading]);

  const formatStory = (story: string) => {
    return story.replace(/(Side \d+:)/g, '<b style="color: black;">$1</b>');
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
        {story && <p style={{color: "black", fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", fontWeight: "500"}} dangerouslySetInnerHTML={{ __html: formatStory(story.replace(/\n/g, "<br />")) }} />}

        {loading && <LoadingText />}
        {!story && !loading && <p style={{color: "white"}}>{DefaultStory}</p>}
        <div ref={endRef} />
      </Box>
    </Stack>
  );
};

export default StoryOutput;
