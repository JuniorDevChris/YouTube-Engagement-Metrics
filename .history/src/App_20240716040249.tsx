import React, { useState } from "react";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import "./App.css";

function App() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoStats, setVideoStats] = useState<any | null>(null);
  const [error, setError] = useState<string>("");

  const extractVideoId = (url: string) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  };

  const fetchVideoStats = async () => {
    try {
      setError("");
      setVideoStats(null);
      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        setError("Invalid YouTube URL");
        return;
      }
      const response = await fetch(
        `https://returnyoutubedislikeapi.com/Votes?videoId=${videoId}`
      );
      const data = await response.json();
      console.log("API Response:", data); // Debugging line
      if (data) {
        setVideoStats(data);
      } else {
        setError("Video not found or stats unavailable");
      }
    } catch (err) {
      console.error("Error fetching video statistics:", err);
      setError("Error fetching video statistics");
    }
  };

  return (
    <Box className="App" p={4}>
      <Text fontSize="2xl" mb={4}>YouTube Video Stats</Text>
      <Input
        placeholder="Enter YouTube video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        mb={2}
      />
      <Button onClick={fetchVideoStats} mb={2}>Search</Button>
      {error && <Text color="red.500" mb={2}>{error}</Text>}
      {videoStats && (
        <Box className="stats">
          <Text>Likes: {videoStats.likes}</Text>
          <Text>Dislikes: {videoStats.dislikes}</Text>
        </Box>
      )}
    </Box>
  );
}

export default App;
