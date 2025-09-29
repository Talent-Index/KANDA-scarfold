// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract KandaHeritage is ERC721, Ownable, ReentrancyGuard {
    uint256 private _tokenIdCounter;

    struct Heritage {
        string title;
        string creator;
        string culturalType; // "story", "song", "wisdom"
        string language;
        string metadataURI; // IPFS link to audio/metadata
        uint256 price;
        address creatorAddress;
        bool verified;
        uint256 validatorCount;
        uint256 totalEarnings;
    }

    mapping(uint256 => Heritage) public heritages;
    mapping(uint256 => mapping(address => bool)) public validators;
    mapping(address => bool) public isValidator;
    
    event HeritageMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string title,
        string culturalType
    );
    
    event HeritageVerified(uint256 indexed tokenId, address validator);
    
    event HeritageLicensed(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 amount
    );

    constructor() ERC721("KANDA Heritage", "KANDA") Ownable(msg.sender) {
    isValidator[msg.sender] = true;
}

   

    // Mint new heritage NFT
    function mintHeritage(
        string memory title,
        string memory creator,
        string memory culturalType,
        string memory language,
        string memory metadataURI,
        uint256 price
    ) external returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _mint(msg.sender, tokenId);
        
        heritages[tokenId] = Heritage({
            title: title,
            creator: creator,
            culturalType: culturalType,
            language: language,
            metadataURI: metadataURI,
            price: price,
            creatorAddress: msg.sender,
            verified: false,
            validatorCount: 0,
            totalEarnings: 0
        });
        
        emit HeritageMinted(tokenId, msg.sender, title, culturalType);
        return tokenId;
    }

    // Verify heritage (simplified - any validator can verify)
    function verifyHeritage(uint256 tokenId) external {
        require(isValidator[msg.sender], "Not a validator");
        require(!validators[tokenId][msg.sender], "Already validated");
        
        validators[tokenId][msg.sender] = true;
        heritages[tokenId].validatorCount++;
        
        // Auto-verify after 1 validator for demo (normally 3)
        if (heritages[tokenId].validatorCount >= 1) {
            heritages[tokenId].verified = true;
        }
        
        emit HeritageVerified(tokenId, msg.sender);
    }

    // License heritage and distribute payment
    function licenseHeritage(uint256 tokenId) external payable nonReentrant {
        Heritage storage heritage = heritages[tokenId];
        require(heritage.verified, "Heritage not verified");
        require(msg.value >= heritage.price, "Insufficient payment");
        
        // Simple revenue split: 60% creator, 40% platform (simplified for demo)
        uint256 creatorShare = (msg.value * 60) / 100;
        uint256 platformShare = msg.value - creatorShare;
        
        payable(heritage.creatorAddress).transfer(creatorShare);
        payable(owner()).transfer(platformShare);
        
        heritage.totalEarnings += msg.value;
        
        emit HeritageLicensed(tokenId, msg.sender, msg.value);
    }

    // Add validator (owner only)
    function addValidator(address validator) external onlyOwner {
        isValidator[validator] = true;
    }

    // Get all heritages (for demo - in production use pagination)
    function getAllHeritages() external view returns (Heritage[] memory) {
        Heritage[] memory allHeritages = new Heritage[](_tokenIdCounter);
        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            allHeritages[i] = heritages[i];
        }
        return allHeritages;
    }

    // Get user's heritages
    function getMyHeritages(address user) external view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (ownerOf(i) == user) {
                count++;
            }
        }
        
        uint256[] memory userTokens = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (ownerOf(i) == user) {
                userTokens[index] = i;
                index++;
            }
        }
        return userTokens;
    }

    // Get heritage details
    function getHeritage(uint256 tokenId) external view returns (Heritage memory) {
        return heritages[tokenId];
    }
}
