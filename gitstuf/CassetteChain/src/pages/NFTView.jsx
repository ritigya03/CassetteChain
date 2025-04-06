import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SecretMessage from "../components/SecretMessage";
import Countdown from 'react-countdown';

import bgvid from '../assets/bgvid.mp4';
import "../index.css";

function NFTView() {
  const location = useLocation();
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [playlist, setPlaylist] = useState('');
  const [message, setMessage] = useState('');
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setName(queryParams.get('name'));
    setImage(queryParams.get('image'));
    setPlaylist(queryParams.get('playlist'));
    setMessage(queryParams.get('message'));
  }, [location.search]);

  const handleCountdownComplete = () => {
    setIsMessageVisible(true);
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

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-plum px-4 text-center">
        
        <h1 className="text-5xl font-serif mb-4">{name}</h1>

        {image && (
          <img
            src={image}
            alt="Mixtape Cover"
            className="w-80 h-80 object-cover rounded-lg mb-6"
          />
        )}

        {playlist && (
          <div className="w-full max-w-2xl mb-6 px-4">
            <iframe
              src={playlist}
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              title="Spotify Playlist"
              className="rounded-lg"
            ></iframe>
          </div>
        )}

        <div className="">
          <Countdown
            date={Date.now() + 10000}
            onComplete={handleCountdownComplete}
            renderer={({ seconds }) => (
              <span className="text-2xl font-bold">{seconds}s</span>
            )}
          />
        </div>

        {isMessageVisible && message && (
          <SecretMessage message={message} />
        )}
      </div>
    </div>
  );
}

export default NFTView;
