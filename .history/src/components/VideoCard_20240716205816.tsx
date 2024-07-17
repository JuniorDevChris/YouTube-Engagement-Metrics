import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <VStack>
        <Image src={thumbnail} alt={title} />
        <Text>{title}</Text>
      </VStack>
    </Box>
  );
};

export default VideoCard;
