import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import VideoGrid from "./components/VideoGrid";
import Navbar from "./components/Navbar";
import "./App.css";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  likes?: number;
  dislikes?: number;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchVideoStats = async (videoId: string) => {
    try {
      const response = await fetch(
        `https://returnyoutubedislikeapi.com/Votes?videoId=${videoId}`
      );
      const data = await response.json();
      return { likes: data.likes, dislikes: data.dislikes };
    } catch (error) {
      console.error("Error fetching video stats:", error);
      return { likes: null, dislikes: null };
    }
  };

  const fetchVideos = async () => {
    try {
      setError("");
      setVideos([]);
      setLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`
      );
      const data = await response.json();
      console.log("API Response:", data); // Debugging line
      if (data.items) {
        const videoResults: Video[] = await Promise.all(
          data.items.map(async (item: any) => {
            const stats = await fetchVideoStats(item.id.videoId);
            return {
              id: item.id.videoId,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.medium.url,
              likes: stats.likes,
              dislikes: stats.dislikes,
            };
          })
        );
        setVideos(videoResults);
      } else {
        setError("No videos found");
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Error fetching videos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <Navbar query={query} setQuery={setQuery} fetchVideos={fetchVideos} />
      <Box mt="80px" p={4} flex="1">
        <Text fontSize="2xl" mb={4}>
          YouTube Video Search
        </Text>
        {error && (
          <Text color="red.500" mb={2}>
            {error}
          </Text>
        )}
      </Box>
      <VideoGrid videos={videos} loading={loading} />
    </Box>
  );
}

export default App;
