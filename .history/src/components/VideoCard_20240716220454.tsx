import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  likes?: number;
  dislikes?: number;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  thumbnail,
  likes,
  dislikes,
}) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <VStack>
        <Image src={thumbnail} alt={title} />
        <Text>{title}</Text>
        <Text>Likes: {likes}</Text>
        <Text>Dislikes: {dislikes}</Text>
      </VStack>
    </Box>
  );
};

export default VideoCard;
