// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import './ERC721BQueryable.sol';

contract Elleverse is ERC721BQueryable, Ownable {
  uint256 public TOTAL_MINT_LIMIT = 6226;
  uint256 public PRESALE_MINT_LIMIT = 1000;
  bool public isPreSale = false;
  bool public isPublicSale = false;
  string public _baseContractURI;
  // TODO: change to production base token uri
  string private _baseTokenURI =
    'https://aax-elle-nft.vercel.app/api/metadata/';
  address public treasury;

  constructor() ERC721B('Elleverse', 'ELLEVERSE') {
    treasury = msg.sender;
  }

  // =============================================================
  //                      MODIFIERS
  // =============================================================
  modifier callerIsUser() {
    require(tx.origin == msg.sender, 'Invalid caller - Caller is a Contract');
    _;
  }

  // =============================================================
  //                      HELPERS
  // =============================================================
  function ownsWhitelistToken(address _owner) public view returns (bool) {
    if (balanceOf(_owner) >= 1) {
      for (uint256 i = 1; i < _nextTokenId(); i += 2) {
        if (ownerOf(i) == _owner) {
          return true;
        }
      }
    }
    return false;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return _baseTokenURI;
  }

  function setBaseURI(string calldata baseURI) external onlyOwner {
    _baseTokenURI = baseURI;
  }

  function setTotalMintLimit(uint256 _newTotalMintLimit) external onlyOwner {
    TOTAL_MINT_LIMIT = _newTotalMintLimit;
  }

  function setPreSaleMintLimit(uint256 _newPreSaleMintLimit)
    external
    onlyOwner
  {
    PRESALE_MINT_LIMIT = _newPreSaleMintLimit;
  }

  function setPreSaleState(bool _state) public onlyOwner {
    isPreSale = _state;
  }

  function setPublicSaleState(bool _state) public onlyOwner {
    isPublicSale = _state;
  }

  // =============================================================
  //                      MINTS & TRANSACTIONS
  // =============================================================

  function airdropBothTokens(address[] calldata _to) external onlyOwner {
    require(
      TOTAL_MINT_LIMIT >= _to.length * 2 + _nextTokenId(),
      "Can't mint - Max mint limit will be exceeded."
    );
    if (_nextTokenId() % 2 != 0) _incrementIndex(1);
    for (uint256 i; i < _to.length; i++) {
      _safeMint(_to[i], 2);
    }
  }

  function airdropWhitelistTokens(address[] calldata _to) external onlyOwner {
    require(
      TOTAL_MINT_LIMIT >= _to.length * 2 + _nextTokenId(),
      "Can't mint - Max mint limit will be exceeded."
    );
    require(
      isPublicSale == false,
      'Cannot airdrop whitelist tokens during public sale'
    );
    if (_nextTokenId() % 2 == 0) _incrementIndex(1);
    for (uint256 i; i < _to.length; i++) {
      // mint whitelist token to owner
      _safeMint(_to[i], 1);
    }
  }

  function preSaleMint() external payable callerIsUser returns (uint256) {
    require(isPreSale == true, "Can't mint - Not in Pre Sale Phase");
    require(
      PRESALE_MINT_LIMIT > _nextTokenId() + 1, // because mint 2 at a time
      "Can't mint - mints will exceed presale mint limit."
    );
    require(
      ownsWhitelistToken(msg.sender) == true,
      "Can't mint - Does not own whitelist token"
    );
    require(msg.value > 0 wei, 'Mint requires a donation of at least 1 wei.');
    if (_nextTokenId() % 2 != 0) _incrementIndex(1);
    uint256 tokenId = _nextTokenId();
    _safeMint(msg.sender, 2);
    return tokenId;
  }

  function publicSaleMint() external payable callerIsUser returns (uint256) {
    require(isPublicSale == true, "Can't mint - Not in Public Sale Phase");
    require(
      TOTAL_MINT_LIMIT > _nextTokenId() + 1, // because mint 2 at a time
      "Can't mint - mints will exceed total mint limit."
    );
    require(msg.value > 0 wei, 'Mint requires a donation of at least 1 wei.');
    if (_nextTokenId() % 2 != 0) _incrementIndex(1);
    uint256 tokenId = _nextTokenId();
    _safeMint(msg.sender, 2);
    return tokenId;
  }

  // =============================================================
  //                      WITHDRAWALS
  // =============================================================

  /** @dev Set the address that act as treasury and recieve all the fund from token contract.
   * @param _treasury New address that caller wants to set as the treasury address
   */
  function setTreasury(address _treasury) external onlyOwner {
    require(_treasury != address(0), 'Invalid address - Zero address');
    treasury = _treasury;
  }

  function withdraw() external onlyOwner {
    payable(treasury).transfer(address(this).balance);
  }

  // =============================================================
  //                      BURNS
  // =============================================================
  function burnMultiple(uint256[] calldata _tokenIds) external onlyOwner {
    require(isPreSale == false, "Can't burn tokens during presale phase");
    require(
      isPublicSale == false,
      "Can't burn tokens during public sale phase"
    );
    for (uint256 i; i < _tokenIds.length; i++) {
      _burn(_tokenIds[i]);
    }
  }
}
