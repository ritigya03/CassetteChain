import { useState } from "react";

export default function SecretMessage({ message }) {
  const [revealed, setRevealed] = useState(false);
  const [hearts, setHearts] = useState([]);

  const revealMessage = () => {
    setRevealed(true);
    generateHearts();
  };

  const generateHearts = () => {
    const newHearts = Array.from({ length: 12 }).map((_, i) => {
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0, moveX = 0, moveY = 0;

      switch (side) {
        case 0:
          x = Math.random() * 100;
          y = -20;
          moveX = (Math.random() - 0.5) * 500;
          moveY = -300;
          break;
        case 1:
          x = 110;
          y = Math.random() * 100;
          moveX = 300;
          moveY = (Math.random() - 0.5) * 500;
          break;
        case 2:
          x = Math.random() * 100;
          y = 110;
          moveX = (Math.random() - 0.5) * 500;
          moveY = 300;
          break;
        case 3:
          x = -20;
          y = Math.random() * 100;
          moveX = -300;
          moveY = (Math.random() - 0.5) * 500;
          break;
      }

      return {
        id: i,
        x,
        y,
        moveX,
        moveY,
        delay: Math.random() * 0.3,
      };
    });

    setHearts(newHearts);
    setTimeout(() => setHearts([]), 2000); // cleanup after animation
  };

  return (
    <div style={{ marginTop: '20px', position: 'relative' }}>
      {!revealed ? (
        <button
          onClick={revealMessage}
          style={{
            backgroundColor: '#331025',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          💌 Reveal Secret Message
        </button>
      ) : (
        <div
          style={{
            background: 'pink',
            padding: '25px',
            borderRadius: '10px',
            border: '2px solid white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            
          }}
        >
          <h3 className="text-md font-bold text-plum">♥️ Secret Message:</h3>
          <p className="font-semibold text-plum">{message}</p>
        </div>
      )}

      {/* Heart Pop Animation */}
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            "--moveX": `${heart.moveX}px`,
            "--moveY": `${heart.moveY}px`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          🩷
        </span>
      ))}
    </div>
  );
}
