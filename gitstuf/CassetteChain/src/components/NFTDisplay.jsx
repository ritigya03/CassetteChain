import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../../MixtapeNFT.json"; // ✅ Replace with your actual ABI file
import getTokenMetadata from "../utils/getTokenMetadata"; // ✅ The helper we created

const contractAddress = "0xA4239DaA9d2F65A9bA0FA83De49CBb8E59560fDD"; // ✅ Replace with your deployed contract address

const NFTDisplay = () => {
  const [tokenId, setTokenId] = useState("");
  const [nftData, setNftData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNFT = async () => {
    if (!tokenId) return alert("Enter a valid Token ID!");

    setLoading(true);
    try {
      // Connect to wallet and contract
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // ✅ Request wallet access
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const metadata = await getTokenMetadata(contract, tokenId);

      if (!metadata) {
        alert("Metadata could not be retrieved. Check if the token ID is correct.");
      } else {
        setNftData(metadata);
      }
    } catch (error) {
      console.error("Error fetching NFT:", error);
      alert("Failed to fetch NFT metadata.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-xl font-bold mb-2">🎨 Fetch Your NFT</h2>
      <input
        type="number"
        value={tokenId}
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Enter Token ID (e.g. 1)"
        className="p-2 border rounded mt-2 w-60"
      />
      <button
        onClick={fetchNFT}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        {loading ? "Fetching..." : "Get NFT Data"}
      </button>

      {nftData && (
        <div className="mt-6 p-4 border rounded shadow-lg max-w-md text-center">
          <h3 className="text-lg font-bold">{nftData.name}</h3>

          {nftData.image && (
            <img
              src={nftData.image}
              alt={nftData.name}
              className="w-40 h-40 object-cover rounded mt-2 mx-auto"
            />
          )}

          {nftData.description && (
            <p className="mt-2 text-gray-700">{nftData.description}</p>
          )}

          {nftData.playlist && (
            <p className="mt-2">
              🎶 Playlist:{" "}
              <a
                href={nftData.playlist}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Open Playlist
              </a>
            </p>
          )}

          {nftData.secretMessage && (
            <p className="mt-2 text-pink-600 font-semibold">
              💌 {nftData.secretMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NFTDisplay;
