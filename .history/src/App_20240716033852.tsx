import React, { useState } from "react";
import "./App.css";

function App() {
  const [videoId, setVideoId] = useState("");
  const [videoStats, setVideoStats] = useState(null);
  const [error, setError] = useState("");

  const fetchVideoStats = async () => {
    try {
      setError("");
      setVideoStats(null);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${
          import.meta.env.VITE_YOUTUBE_API_KEY
        }`VITE_YOUTUBE_API_KEY
      );
      const data = await response.json();
      if (data.items.length > 0) {
        setVideoStats(data.items[0].statistics);
      } else {
        setError("Video not found");
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
          <p>Likes: {videoStats.likeCount}</p>
          <p>Dislikes: {videoStats.dislikeCount}</p>
        </div>
      )}
    </div>
  );
}

export default App;
