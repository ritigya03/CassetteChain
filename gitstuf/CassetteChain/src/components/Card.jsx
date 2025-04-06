import { useNavigate } from 'react-router-dom';

const Card = ({ name, url, image }) => {
  const navigate = useNavigate();

  const handleMintClick = () => {
    navigate('/mint-form', { 
      state: { 
        name, 
        image ,
        playlist: url 
      } 
    });
  };

  return (
    <div className="bg-[#dca9b6] p-8 rounded-xl  shadow-plum shadow-lg w-[350px] text-center transition-transform transform hover:scale-105">
      <h3 className="text-xl font-bold text-plum">{name}</h3>
      <img className="mt-5" src={image} alt="" />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-800 text-lg hover:underline mt-5 block"
      >
        Open on Spotify
      </a>
      <button 
        onClick={handleMintClick}
        className="text-plum text-xl font-semibold  mt-2"
      >
        Mint and Send
      </button>
    </div>
  );
};

export default Card;