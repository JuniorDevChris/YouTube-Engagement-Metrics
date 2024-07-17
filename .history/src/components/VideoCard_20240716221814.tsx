import React from "react";
import { Box, Image, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

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
        <Heading>{title}</Heading>
        <HStack>
          <HStack spacing={1}>
            <Icon as={AiFillLike} boxSize={6} color="blue.500" />
            <Text>{likes}</Text>
          </HStack>
          <HStack spacing={1}>
            <Icon as={AiFillDislike} boxSize={6} color="red.500" />
            <Text>{dislikes}</Text>
          </HStack>
        </HStack>
      </VStack>
    </Box>
  );
};

export default VideoCard;
