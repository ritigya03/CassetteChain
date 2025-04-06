const getTokenMetadata = async (contract, tokenId) => {
    try {
      const tokenURI = await contract.tokenURI(tokenId);
  
      const url = tokenURI.startsWith("ipfs://")
        ? tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
        : tokenURI;
  
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch metadata: ${res.status}`);
      }
  
      const metadata = await res.json();
  
      Object.keys(metadata).forEach((key) => {
        if (typeof metadata[key] === "string" && metadata[key].startsWith("ipfs://")) {
          metadata[key] = metadata[key].replace("ipfs://", "https://ipfs.io/ipfs/");
        }
      });
  
      return metadata;
    } catch (err) {
      console.error("Error fetching token metadata:", err);
      return null;
    }
  };
  
  export default getTokenMetadata;
  