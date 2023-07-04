import { Box, HStack, useToast, useBreakpointValue, Text } from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";
import { useState } from "react";

type FileUploadProps = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setImage: (image: File | null) => void;
  setImagine: (imagine: string | null) => void;
};

const FileUploader = ({
  loading,
  setLoading,
  setImage,
  setImagine,
}: FileUploadProps) => {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files)
      return toast({ title: "No file selected", status: "error" });

    setLoading(true);
    setImagine(null);
    const file = e.target.files[0];
    setImage(file);
    setSelectedImage(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;

      const hit = await fetch("/api/imagine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: base64String }),
      });

      if (!hit.ok) {
        setLoading(false);
        return toast({ title: "Upload failed", status: "error" });
      }

      const streamData = hit.body;
      if (!streamData) return;

      const streamReader = streamData.getReader();
      const textDecoder = new TextDecoder();
      let imagineText = "";

      while (true) {
        const { value, done } = await streamReader.read();
        const chunkValue = textDecoder.decode(value);

        imagineText = imagineText + chunkValue;
        setImagine(imagineText);

        if (done) {
          setLoading(false);
          break;
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const isMobile = useBreakpointValue({ base: true, md: false });
  const iconSize = isMobile ? 32 : 32;
  const imageSize = "80%";
  const frameSize = useBreakpointValue({ base: "calc(400px - 32px)", md: "400px" });



  return (
    <Box display="flex" justifyContent="center" width="screen">
      <label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          disabled={loading}
          hidden
          onChange={(e) => handleUpload(e)}
        />

        <HStack
          rounded="md"
          px="4"
          py="2"
          border="1px dashed"
          borderColor="black"
          align="center"
          transitionDuration="0.2s"
          _hover={loading ? {} : { bg: "gray.100" }}
          opacity={loading ? 0.5 : 1}
          cursor={loading ? "not-allowed" : "pointer"}
          position="relative"
          overflow="hidden"
          pb={selectedImage ? 0 : 0.5}
          width={frameSize}
          height={frameSize}
        >
          {selectedImage ? (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              padding="8px"
              width={imageSize}
              height={imageSize}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={selectedImage}
                alt="Uploaded Image"
                layout="fill"
                objectFit="contain"
              />
            </Box>
          ) : (
            <AiOutlineCloudUpload size={iconSize} />
          )}
          {!selectedImage && (
            <Text
              fontSize={{
                base: "xs",
                md: "lg",
              }}
              fontWeight="medium"
              pb={0.5}
            >
              Eller dra inn et bilde {!isMobile && "for å få en inspirert fortelling"}
            </Text>
          )}
        </HStack>
      </label>
    </Box>
  );
};

export default FileUploader;
