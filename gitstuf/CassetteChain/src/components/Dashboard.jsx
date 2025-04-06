import React, { useRef, useState } from 'react';
import bgvid from '../assets/bgvid.mp4';
import { Link } from 'react-router-dom';
import logoImage from '../assets/Screenshot 2025-03-28 144631.png';
import { motion } from 'framer-motion';
import loveAudio from '../assets/love.mp3';
import ThreeStepSection from './ThreeStepSection';
import '../index.css';

const Dashboard = () => {
  const audioRef = useRef(null);
  const [hearts, setHearts] = useState([]);

  const handleEasterEgg = () => {
    console.log("💖 Button clicked! Attempting to play audio...");

    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play()
        .then(() => {
          console.log("✅ Audio is playing!");
          generateHearts();
        })
        .catch((err) => console.error("🚫 Audio playback error:", err));
    }
  };

  const generateHearts = () => {
    const heartEmojis = ['💖', '💘', '💗', '🩷', '💓'];
  
    const newHearts = Array.from({ length: 25 }).map((_, index) => ({
      id: Date.now() + index,
      x: Math.random() * 100, // Spread across the entire width
      y: 100,
      moveX: (Math.random() - 0.5) * 300, // Spread much more horizontally
      moveY: -Math.random() * 400 - 200,  // Go higher up
      delay: Math.random() * 1.2,         // Delay slightly longer
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    }));
  
    setHearts((prev) => [...prev, ...newHearts]);
  
    setTimeout(() => {
      setHearts([]);
    }, 3500); // Slightly longer to match the animation
  };
  

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={bgvid} type="video/mp4" />
      </video>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-plum text-center px-4">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          src={logoImage}
          alt="Logo"
          className="w-[700px] h-[340px] 2xl:w-[1000px] 2xl:mt-[10px] animate-shimmer"
        />

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-4xl max-w-3xl font-black"
        >
          “Turn your crush into crypto.”
          <span className="block text-2xl text-plum font-sans font-bold mt-4">
            Gift your feelings through Spotify-powered, NFT mixtapes that unlock secret messages when fully listened to. Powered by Web3. Fueled by love.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8"
        >
          <Link to="/playlists">
            <button className="px-8 py-5 text-white press-start bg-plum hover:bg-opacity-80 rounded-lg font-semibold">
              Playlists
            </button>
          </Link>
        </motion.div>
        <ThreeStepSection />
      </div>

      {/* Easter Egg Button + Hearts */}
      <div className="absolute bottom-10 right-10 z-50">
        <button
          onClick={handleEasterEgg}
          className="text-4xl hover:scale-125 transition-transform duration-300 cursor-pointer"
          title="A little surprise 💖"
        >
          🎵
        </button>

        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="heart"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              '--moveX': `${heart.moveX}px`,
              '--moveY': `${heart.moveY}px`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            {heart.emoji}
          </span>
        ))}
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={loveAudio} preload="auto" />
    </div>
  );
};

export default Dashboard;
