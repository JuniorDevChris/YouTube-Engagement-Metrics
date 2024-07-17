import React from "react";
import { SimpleGrid, Spinner, Center, Box } from "@chakra-ui/react";
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
      <Box position="relative" width="100%" height="100%">
        <Center height="100%">
          <Spinner size="xl" />
        </Center>
      </Box>
    );
  }

  return (
    <Center width="100%">
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default VideoGrid;
