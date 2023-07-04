import { Box, Stack, Text } from "@chakra-ui/react";
import LoadingText from "./LoadingText";

type RoastOutputProps = {
  image: File | null;
  roast: string | null;
  loading: boolean;
};

const DefaultRoast = "Please upload a picture to roast.";

const RoastOutput = ({ image, roast, loading }: RoastOutputProps) => {
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
        <Text>
          {roast && roast}

          {loading && <LoadingText />}

          {!roast && !loading && <>{DefaultRoast}</>}
        </Text>
      </Box>
    </Stack>
  );
};

export default RoastOutput;
