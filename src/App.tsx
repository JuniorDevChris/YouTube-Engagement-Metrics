import React, { useState } from "react";
import { Box, Center } from "@chakra-ui/react";
import VideoGrid from "./components/VideoGrid";
import Navbar from "./components/Navbar";
import "./App.css";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  views?: number;
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
      // Fetch likes and views from YouTube Data API
      const youtubeResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`
      );
      const youtubeData = await youtubeResponse.json();
      const stats = youtubeData.items[0].statistics;

      // Fetch dislikes from Return YouTube Dislike API
      const dislikeResponse = await fetch(
        `https://returnyoutubedislikeapi.com/Votes?videoId=${videoId}`
      );
      const dislikeData = await dislikeResponse.json();

      return {
        likes: stats.likeCount,
        dislikes: dislikeData.dislikes,
        views: stats.viewCount,
      };
    } catch (error) {
      console.error("Error fetching video stats:", error);
      return { likes: null, dislikes: null, views: null };
    }
  };

  const fetchVideos = async () => {
    try {
      setError("");
      setVideos([]);
      setLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=6&type=video&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`
      );
      const data = await response.json();
      console.log(data);
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
              views: stats.views,
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
      <Center flex="1" p={4}>
        {error && (
          <Box color="red.500" mb={2}>
            {error}
          </Box>
        )}
        <VideoGrid videos={videos} loading={loading} />
      </Center>
    </Box>
  );
}

export default App;
