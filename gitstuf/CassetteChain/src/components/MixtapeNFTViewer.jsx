// MixtapeNFTViewer.jsx
import React, { useState, useEffect } from "react";

const MixtapeNFTViewer = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 min = 600 seconds
  const [messageUnlocked, setMessageUnlocked] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setMessageUnlocked(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 animate-pulse">🎶 Mixtape NFT Experience</h1>

      <iframe
        src="https://open.spotify.com/embed/playlist/1urAqJ4TojgW2i3MUpqm45?utm_source=generator"
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="max-w-xl rounded-xl shadow-xl mb-8"
      ></iframe>

      {!messageUnlocked ? (
        <div className="text-center">
          <p className="text-lg mb-2">Your secret will unlock after:</p>
          <div className="text-3xl font-mono tracking-widest animate-bounce">
            {formatTime(timeLeft)}
          </div>
        </div>
      ) : (
        <div className="text-center bg-white text-black p-6 rounded-2xl shadow-2xl max-w-lg">
          <h2 className="text-2xl font-semibold mb-4">💌 Secret Message</h2>
          <p className="text-lg italic">hi ritigya ❤️</p>
        </div>
      )}
    </div>
  );
};

export default MixtapeNFTViewer;
