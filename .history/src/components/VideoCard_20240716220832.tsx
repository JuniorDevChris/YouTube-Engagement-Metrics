import React from "react";
import { Box, Image, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { Icon } from '@chakra-ui/react'
import { MdSettings } from 'react-icons/md'

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
        <HStack>
          <Icon as={AiOutlineLike} />
          <Text>{likes}</Text>
          <Icon as={AiOutlineDislike} />
          <Text>{dislikes}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default VideoCard;
