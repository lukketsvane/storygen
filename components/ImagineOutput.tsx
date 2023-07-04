import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import LoadingText from "./LoadingText";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";

type ImagineOutputProps = {
  image: File | null;
  imagine: string | null;
  loading: boolean;
};

const DefaultImagine = "Please upload a picture to inspire a story.";

const ImagineOutput = ({ image, imagine, loading }: ImagineOutputProps) => {
  const formatImagine = (imagine: string) => {
    return imagine.replace(/(Side \d+:)/g, '<span style="color: black;">$1</span>');
  };

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
        {imagine && <Text style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "16px", fontWeight: "500" }} dangerouslySetInnerHTML={{ __html: formatImagine(imagine.replace(/\n/g, "<br />")) }} />}
        {loading && <LoadingText />}
        {!imagine && !loading && <Text style={{ color: "white" }}>{DefaultImagine}</Text>}
      </Box>
    </Stack>
  );
};

export default ImagineOutput;
