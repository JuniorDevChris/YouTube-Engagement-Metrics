import React from "react";
import { Box, Image, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  likes?: number;
  dislikes?: number;
  views?: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail, likes, dislikes, views }) => {
  return (
    <Box borderWidth="2px" borderColor="gray.300" borderRadius="lg" overflow="hidden" p={4}>
      <VStack>
        <Image src={thumbnail} alt={title} />
        <Text>{title}</Text>
        <HStack>
          <HStack spacing={1}>
            <Icon as={FaEye} boxSize={6} color="gray.500" />
            <Text>{views}</Text>
          </HStack>
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
