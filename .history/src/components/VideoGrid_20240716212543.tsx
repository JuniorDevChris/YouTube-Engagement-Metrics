import React from "react";
import { SimpleGrid, Spinner, Flex } from "@chakra-ui/react";
import VideoCard from "./VideoCard";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  likes?: number;
  dislikes?: number;
}

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading }) => {
  if (loading) {
    return (
      <Flex justify="center" align="center" width="100%" height="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </SimpleGrid>
  );
};

export default VideoGrid;
