import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import VideoCard from "./VideoCard";

interface Video {
  id: string;
  title: string;
  thumbnail: string;a
}

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos }) => {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </SimpleGrid>
  );
};

export default VideoGrid;
