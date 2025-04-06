// utils/uploadToPinata.js
export const uploadToPinata = async (metadata) => {
    const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
  
    if (!PINATA_JWT) {
      throw new Error("Pinata JWT not found! Make sure VITE_PINATA_JWT is set.");
    }
  
    const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: PINATA_JWT,
      },
      body: JSON.stringify({
        pinataContent: metadata,
      }),
    });
  
    const data = await res.json();
  
    if (!res.ok) throw new Error(data.error || "Upload to Pinata failed");
  
    return `https://ipfs.io/ipfs/${data.IpfsHash}`;
  };
  