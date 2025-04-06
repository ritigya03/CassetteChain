// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MixtapeNFT is ERC721URIStorage {
    uint256 private tokenCounter;

    event MixtapeMinted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("MixtapeNFT", "MTNFT") {
        tokenCounter = 1;
    }

    function mintMixtape(address recipient, string memory _tokenURI) public returns (uint256) {
        uint256 tokenId = tokenCounter;

        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        emit MixtapeMinted(recipient, tokenId, _tokenURI);

        tokenCounter += 1;
        return tokenId;
    }

    function getTokenCounter() public view returns (uint256) {
        return tokenCounter;
    }
}
