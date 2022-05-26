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

  // A function our user will hit to get their NFT.
  function mint(string memory tokenURI) payable external returns (uint256) {
    require(msg.value > 0 wei, 'Mint requires a donation of at least 1 wei.');
    
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _safeMint(msg.sender, newItemId);
    _setTokenURI(newItemId, tokenURI);
    payable(owner()).transfer(msg.value);
    
    return newItemId;
  }

  // Mints 2 NFTs at a time. 1 for the sender and 1 for the receiver
  function mint2(address to, string memory messageURI, string memory receiptURI) payable external returns (uint256) {
    require(msg.value > 0 wei, 'Mint requires a donation of at least 1 wei.');
    
    // mint secret message
    _tokenIds.increment();
    uint256 secretMessageId = _tokenIds.current();
    _safeMint(to, secretMessageId);
    _setTokenURI(secretMessageId, messageURI);

    // mint receipt
    _tokenIds.increment();
    uint256 receiptItemId = _tokenIds.current();
    _safeMint(msg.sender, receiptItemId);
    _setTokenURI(receiptItemId, receiptURI);

    // pay the donation
    payable(owner()).transfer(msg.value);

    return secretMessageId;
  }
}
