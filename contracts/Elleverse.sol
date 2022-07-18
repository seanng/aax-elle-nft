// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.1;

import '@openzeppelin/contracts/access/Ownable.sol';
import './ERC721AE.sol';

contract Elleverse is ERC721AE, Ownable {
  uint256 public MAX_SUPPLY = 6226;
  bool public isPreSale = false;
  bool public isPublicSale = false;
  string public _baseContractURI;
  string private _baseTokenURI;
  address public treasury;

  constructor() ERC721AE('Elleverse', 'ELLEVERSE') {
    treasury = msg.sender;
  }

  // =============================================================
  //                      MODIFIERS
  // =============================================================
  modifier preSaleActive() {
    require(isPreSale == true, "Can't mint - Not in Pre Sale Phase");
    _;
  }

  modifier publicSaleActive() {
    require(isPublicSale == true, "Can't mint - Not in Public Sale Phase");
    _;
  }

  modifier callerIsUser() {
    require(tx.origin == msg.sender, 'Invalid caller - Caller is a Contract');
    _;
  }

  modifier withinLimit() {
    require(
      MAX_SUPPLY >= totalSupply(),
      "Can't mint - Max token supply limit exceeded."
    );
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

  function setMaxSupply(uint256 _newMaxSupply) external onlyOwner {
    MAX_SUPPLY = _newMaxSupply;
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
  function airdropWhitelistTokens(address[] calldata _addresses)
    external
    onlyOwner
    withinLimit
  {
    for (uint256 i; i < _addresses.length; i++) {
      if (_nextTokenId() % 2 == 0) _incrementIndex(1);
      // mint whitelist token to owner
      _safeMint(_addresses[i], 1);
    }
  }

  function preSaleMint()
    external
    payable
    preSaleActive
    callerIsUser
    withinLimit
  {
    require(
      ownsWhitelistToken(msg.sender) == true,
      "Can't mint - Does not own whitelist token"
    );
    require(msg.value > 0 wei, 'Mint requires a donation of at least 1 wei.');
    if (_nextTokenId() % 2 != 0) _incrementIndex(1);
    _safeMint(msg.sender, 2);
  }

  function publicSaleMint()
    external
    payable
    publicSaleActive
    callerIsUser
    withinLimit
  {
    require(msg.value > 0 wei, 'Mint requires a donation of at least 1 wei.');
    if (_nextTokenId() % 2 != 0) _incrementIndex(1);
    _safeMint(msg.sender, 2);
  }

  /**
   * Withdrawal Functions
   */

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
}
