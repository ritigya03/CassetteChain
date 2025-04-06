import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import playImg from '../assets/Screenshot 2025-03-31 143024.png';
import '../index.css';
import { ethers } from 'ethers';
import { uploadToPinata } from '../utils/uploadToPinata';

const MintForm = () => {
  const location = useLocation();
  const { name, image, playlist } = location.state || {};

  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nftLink, setNftLink] = useState('');

  const generateNFTViewLink = (name, image, playlist, message, tokenId) => {
    const embeddedPlaylistUrl = playlist.includes('open.spotify.com/playlist/')
      ? playlist.replace('open.spotify.com/playlist/', 'open.spotify.com/embed/playlist/')
      : playlist;

    const nftUrl = `http://localhost:5173/nft-view?name=${encodeURIComponent(
      name
    )}&image=${encodeURIComponent(image)}&playlist=${encodeURIComponent(
      embeddedPlaylistUrl
    )}&message=${encodeURIComponent(message)}&tokenId=${tokenId}`;

    console.log('Generated NFT View Link:', nftUrl);
    return nftUrl;
  };

  const handleMint = async (e) => {
    e.preventDefault();

    if (!recipient || !message) {
      alert('Please enter recipient and message!');
      return;
    }

    if (!ethers.utils.isAddress(recipient)) {
      alert('Please enter a valid Ethereum address!');
      return;
    }

    if (!window.ethereum) {
      setErrorMessage('Please install MetaMask!');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setTransactionHash('');
    setNftLink('');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const abi = [
        'function mintMixtape(address recipient, string memory tokenURI) public onlyOwner returns (uint256)',
      ];

      const contract = new ethers.Contract(
        '0xA4239DaA9d2F65A9bA0FA83De49CBb8E59560fDD', // Change to your contract address
        abi,
        signer
      );

      const embeddedPlaylistUrl = playlist.includes('open.spotify.com/playlist/')
        ? playlist.replace('open.spotify.com/playlist/', 'open.spotify.com/embed/playlist/')
        : playlist;

      const metadata = {
        name: name,
        description: `Mixtape NFT from Romancer 🎵\n\n🎶 Playlist: ${
          embeddedPlaylistUrl || 'Not provided'
        }\n💌 \n\n🔗 View NFT: ${generateNFTViewLink(
          name,
          image,
          embeddedPlaylistUrl,
          message,
          'pending'
        )}`,
        image: image,
        attributes: [
          { trait_type: 'Playlist URL', value: embeddedPlaylistUrl },
          { trait_type: 'Secret Message', value: message },
        ],
      };

      const tokenURI = await uploadToPinata(metadata);
      console.log('Metadata uploaded to:', tokenURI);

      const tx = await contract.mintMixtape(recipient, tokenURI, {
        gasLimit: 10000000,
      });

      await tx.wait();
      setTransactionHash(tx.hash);

      const receipt = await provider.getTransactionReceipt(tx.hash);
      const transferEvent = receipt.logs.find(
        (log) => log.topics[0] === ethers.utils.id('Transfer(address,address,uint256)')
      );

      if (transferEvent) {
        const tokenId = ethers.BigNumber.from(transferEvent.topics[3]).toString();
        console.log('Minted tokenId:', tokenId);
        const nftViewLink = generateNFTViewLink(
          name,
          image,
          embeddedPlaylistUrl,
          message,
          tokenId
        );
        setNftLink(nftViewLink);
      } else {
        console.error('Transfer event not found in receipt logs');
      }

      alert('Minted successfully!');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${playImg})` }}
    >
      <div className="max-w-2xl mt-10 mx-auto p-10 bg-black rounded-lg shadow-pink-900 shadow-lg">
        <h2 className="text-2xl text-center font-bold text-white mb-4">
          Mint and Send NFT
        </h2>

        <div className="mb-4">
          <img src={image} alt={name} className="w-full rounded-lg" />
          <p className="text-white text-center press-start text-2xl font-bold mt-2">{name}</p>
          {playlist && (
            <p className="text-pink-400 text-center mt-1">
              <a
                href={playlist}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View Playlist
              </a>
            </p>
          )}
        </div>

        <form onSubmit={handleMint} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Recipient Address</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white"
              placeholder="0x..."
            />
          </div>

          <div>
            <label className="block text-white mb-1">Secret Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 rounded bg-white text-black"
              placeholder="Hopeless Romantics..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Minting...' : 'Mint and Send'}
          </button>
        </form>

        {transactionHash && (
          <p className="text-white mt-4">
            Transaction Hash:&nbsp;
            <a
              href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 underline"
            >
              View on Etherscan
            </a>
          </p>
        )}

        {nftLink && (
          <p className="text-white mt-4">
            NFT View Link:&nbsp;
            <a
              href={nftLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 underline"
            >
              View NFT
            </a>
          </p>
        )}

        {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
      </div>

      <Link to="/playlists" className="absolute top-5 left-5">
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all">
          Back
        </button>
      </Link>
    </div>
  );
};

export default MintForm;
