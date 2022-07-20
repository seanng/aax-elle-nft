// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ElleNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  // We need to pass the name of our NFTs token and its symbol.
  constructor() ERC721 ("ElleNFT", "ELLE") {}

  // for testing purposes.
  function getTokenId() external view onlyOwner returns (uint256) {
    return _tokenIds.current();
  }

  function airdropWhitelistOnly(string memory whiteListTokenUri) external onlyOwner {
    _tokenIds.increment();
    _tokenIds.increment();
    uint256 whiteListTokenId = _tokenIds.current();
    _setTokenURI(whiteListTokenId, whiteListTokenUri);
  }

  function mint(string memory messageTokenUri, string memory prizeTokenUri) payable external returns (uint256) {
    require(msg.value > 0 wei, 'Mint requires a donation of at least 1 wei.');

    // mint message
    _tokenIds.increment();
    uint256 messageTokenId = _tokenIds.current();
    _safeMint(msg.sender, messageTokenId);
    _setTokenURI(messageTokenId, messageTokenUri);
    
    // mint prize / whitelist
    _tokenIds.increment();
    uint256 prizeTokenId = _tokenIds.current();
    _safeMint(msg.sender, prizeTokenId);
    _setTokenURI(prizeTokenId, prizeTokenUri);

    // pay the donation
    payable(owner()).transfer(msg.value);
    
    return messageTokenId;
  }
}
