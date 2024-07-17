import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Text,
  SimpleGrid,
  Image,
  VStack,
} from "@chakra-ui/react";
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
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`
      );
      const data = await response.json();
      console.log("API Response:", data);
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
      <Input
        placeholder="Enter search query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        mb={2}
      />
      <Button onClick={fetchVideos} mb={2}>
        Search
      </Button>
      {error && (
        <Text color="red.500" mb={2}>
          {error}
        </Text>
      )}
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
        {videos.map((video) => (
          <Box
            key={video.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
          >
            <VStack>
              <Image src={video.thumbnail} alt={video.title} />
              <Text>{video.title}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default App;
