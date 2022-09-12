// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/access/Ownable.sol';
import './ERC721BQueryable.sol';

contract Elleverse is ERC721BQueryable, Ownable {
  string private NOT_STARTED_PHASE = 'NOT STARTED';
  string private PRIVATE_SALE_PHASE = 'PRIVATE SALE';
  string private PUBLIC_SALE_PHASE = 'PUBLIC SALE';
  string private EVENT_OVER_PHASE = 'EVENT OVER';

  string public SALE_PHASE = NOT_STARTED_PHASE;
  uint256 public TOTAL_MINT_LIMIT = 6226;
  uint256 public PRIVATE_SALE_MINT_LIMIT = 6226;

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
  function _isStringEqual(string memory a, string memory b)
    private
    pure
    returns (bool)
  {
    return (keccak256(abi.encodePacked((a))) ==
      keccak256(abi.encodePacked((b))));
  }

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

  function setNotStartedPhase() public onlyOwner {
    SALE_PHASE = NOT_STARTED_PHASE;
  }

  function setPrivateSalePhase() public onlyOwner {
    SALE_PHASE = PRIVATE_SALE_PHASE;
  }

  function setPublicSalePhase() public onlyOwner {
    SALE_PHASE = PUBLIC_SALE_PHASE;
  }

  function setEventOverPhase() public onlyOwner {
    SALE_PHASE = EVENT_OVER_PHASE;
  }

  function setTotalMintLimit(uint256 _newTotalMintLimit) external onlyOwner {
    TOTAL_MINT_LIMIT = _newTotalMintLimit;
  }

  function setPrivateSaleMintLimit(uint256 _newLimit) external onlyOwner {
    PRIVATE_SALE_MINT_LIMIT = _newLimit;
  }

  // =============================================================
  //                      MINTS & TRANSACTIONS
  // =============================================================

  /**
   * @dev Function used to airdrop tokens to KOL and Winning Fans.
   * The _to addresses must be passed in correct order to display correct NFT image.
   */
  function airdropBothTokens(address[] calldata _to) external onlyOwner {
    require(
      TOTAL_MINT_LIMIT >= totalSupply() + (_to.length * 2),
      "Can't mint - Max mint limit will be exceeded."
    );
    if (_nextTokenId() % 2 != 0) _incrementIndex(1);
    for (uint256 i; i < _to.length; i++) {
      _safeMint(_to[i], 2);
    }
  }

  /**
   * @dev Function used to airdrop only WL tokens to fans that responded.
   */
  function airdropWhitelistTokens(address[] calldata _to) external onlyOwner {
    require(
      TOTAL_MINT_LIMIT >= totalSupply() + (_to.length * 2),
      "Can't mint - Max mint limit will be exceeded."
    );
    require(
      _isStringEqual(SALE_PHASE, NOT_STARTED_PHASE),
      'Can only airdrop whitelist tokens before private sale phase has started.'
    );
    for (uint256 i; i < _to.length; i++) {
      if (_nextTokenId() % 2 == 0) _incrementIndex(1);
      // mint whitelist token to owner
      _safeMint(_to[i], 1);
    }
  }

  function privateSaleMint() external payable callerIsUser returns (uint256) {
    require(
      _isStringEqual(SALE_PHASE, PRIVATE_SALE_PHASE),
      "Can't mint - Not in private sale phase"
    );
    require(
      PRIVATE_SALE_MINT_LIMIT >= totalSupply() + 2, // because mint 2 at a time
      "Can't mint - mints will exceed private sale mint limit."
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
    require(
      _isStringEqual(SALE_PHASE, PUBLIC_SALE_PHASE),
      "Can't mint - Not in public sale phase"
    );
    require(
      TOTAL_MINT_LIMIT >= totalSupply() + 2, // because mint 2 at a time
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
    require(
      _isStringEqual(SALE_PHASE, EVENT_OVER_PHASE),
      "Can't burn - not in completed phase."
    );
    for (uint256 i; i < _tokenIds.length; i++) {
      _burn(_tokenIds[i]);
    }
  }
}
