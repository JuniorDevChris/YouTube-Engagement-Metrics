import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import SearchInput from "./components/SearchInput";
import VideoGrid from "./components/VideoGrid";
import "./App.css";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string>("");

  const fetchVideos = async () => {
    try {
      setError("");
      setVideos([]);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );
      const data = await response.json();
      console.log("API Response:", data); // Debugging line
      if (data.items) {
        const videoResults: Video[] = data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
        setVideos(videoResults);
      } else {
        setError("No videos found");
      }
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Error fetching videos");
    }
  };

  return (
    <Box className="App" p={4}>
      <Text fontSize="2xl" mb={4}>
        YouTube Video Search
      </Text>
      <SearchInput query={query} setQuery={setQuery} fetchVideos={fetchVideos} />
      {error && <Text color="red.500" mb={2}>{error}</Text>}
      <VideoGrid videos={videos} />
    </Box>
  );
}

export default App;
