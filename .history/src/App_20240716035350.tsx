import React, { useState } from "react";
import "./App.css";

function App() {
  const [videoId, setVideoId] = useState("");
  const [videoStats, setVideoStats] = useState(null);
  const [error, setError] = useState("");

  const fetchVideoStats = async () => {
    try {
      console.log("Fetching video stats");
      setError("");
      setVideoStats(null);
      const response = await fetch(
        `https://returnyoutubedislikeapi.com/Votes?videoId=${videoId}`
      );
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (data) {
        setVideoStats(data);
        
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
          <p>Likes: {videoStats.likes}</p>
          <p>Dislikes: {videoStats.dislikes}</p>
        </div>
      )}
    </div>
  );
}

export default App;
