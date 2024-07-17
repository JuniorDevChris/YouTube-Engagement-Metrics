import React from "react";
import { SimpleGrid, Spinner, AbsoluteCenter } from "@chakra-ui/react";
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
      <B<AbsoluteCenter width="100%" height="100%">
        <Spinner size="xl" />
      </AbsoluteCenter>
    );
  }

  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4} width="100%">
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </SimpleGrid>
  );
};

export default VideoGrid;
