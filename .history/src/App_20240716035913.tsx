import React, { useState } from "react";
import "./App.css";

interface VideoStats {
  dateCreated: string;
  deleted: boolean;
  dislikes: number;
  id: string;
  likes: number;
  rating: number;
  viewCount: number;
}

function App() {
  const [videoId, setVideoId] = useState<string>("");
  const [videoStats, setVideoStats] = useState<VideoStats | null>(null);
  const [error, setError] = useState<string>("");

  const fetchVideoStats = async () => {
    try {
      setError("");
      setVideoStats(null);
      const response = await fetch(
        `https://returnyoutubedislikeapi.com/Votes?videoId=${videoId}`
      );
      const data: VideoStats = await response.json();
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
    <div className="App">
      <h1>YouTube Video Stats</h1>
      <input
        type="text"
        placeholder="Enter video ID"
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
      />
      <button onClick={fetchVideoStats}>Search</button>
      {error && <p className="error">{error}</p>}
      {videoStats && (
        <div className="stats">
          <p>Likes: {videoStats.likes}</p>
          <p>Dislikes: {videoStats.dislikes}</p>
        </div>
      )}
    </div>
  );
}

export default App;
