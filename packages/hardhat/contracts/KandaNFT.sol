// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract KandaNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct HeritageAsset {
        uint256 tokenId;
        address creator;
        string culturalType; // "story", "music", "craft", "wisdom"
        string language;
        string region;
        uint256 communityId;
        uint256 creationDate;
        bool verified;
        uint256 totalEarnings;
        uint256 licensingPrice;
        mapping(address => bool) elderValidators;
        uint256 validatorCount;
    }

    struct Community {
        uint256 communityId;
        string name;
        string region;
        address[] elders;
        uint256 totalAssets;
        uint256 totalEarnings;
        bool active;
    }

    // Mappings
    mapping(uint256 => HeritageAsset) public heritageAssets;
    mapping(uint256 => Community) public communities;
    mapping(address => uint256) public creatorCommunity;
    mapping(address => bool) public heritageAmbassadors;
    
    // Events
    event HeritageAssetMinted(
        uint256 indexed tokenId,
        address indexed creator,
        uint256 indexed communityId,
        string culturalType
    );
    
    event AssetVerified(
        uint256 indexed tokenId,
        address[] validators,
        uint256 timestamp
    );
    
    event EarningsDistributed(
        uint256 indexed tokenId,
        uint256 creatorShare,
        uint256 communityShare,
        uint256 validatorShare
    );

    constructor() ERC721("KANDA Heritage", "KANDA") {}

    // Mint new heritage asset
    function mintHeritageAsset(
        address creator,
        string memory tokenURI,
        string memory culturalType,
        string memory language,
        string memory region,
        uint256 communityId,
        uint256 licensingPrice
    ) public returns (uint256) {
        require(
            heritageAmbassadors[msg.sender] || creatorCommunity[creator] == communityId,
            "Unauthorized minter"
        );

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(creator, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        HeritageAsset storage asset = heritageAssets[tokenId];
        asset.tokenId = tokenId;
        asset.creator = creator;
        asset.culturalType = culturalType;
        asset.language = language;
        asset.region = region;
        asset.communityId = communityId;
        asset.creationDate = block.timestamp;
        asset.verified = false;
        asset.licensingPrice = licensingPrice;
        
        communities[communityId].totalAssets++;
        
        emit HeritageAssetMinted(tokenId, creator, communityId, culturalType);
        return tokenId;
    }

    // Add elder validator to heritage asset
    function addElderValidation(
        uint256 tokenId,
        address elder
    ) external {
        require(_exists(tokenId), "Asset does not exist");
        require(!heritageAssets[tokenId].elderValidators[elder], "Elder already validated");
        
        HeritageAsset storage asset = heritageAssets[tokenId];
        Community storage community = communities[asset.communityId];
        
        // Verify elder is part of community
        bool isValidElder = false;
        for (uint i = 0; i < community.elders.length; i++) {
            if (community.elders[i] == elder) {
                isValidElder = true;
                break;
            }
        }
        require(isValidElder, "Not authorized elder");
        
        asset.elderValidators[elder] = true;
        asset.validatorCount++;
        
        // Auto-verify if 3+ elders validated
        if (asset.validatorCount >= 3) {
            asset.verified = true;
            address[] memory validators = new address[](asset.validatorCount);
            // Note: In production, you'd want to track validator addresses more efficiently
            emit AssetVerified(tokenId, validators, block.timestamp);
        }
    }

    // License heritage asset and distribute earnings
    function licenseAsset(uint256 tokenId) external payable nonReentrant {
        require(_exists(tokenId), "Asset does not exist");
        require(heritageAssets[tokenId].verified, "Asset not verified");
        require(msg.value >= heritageAssets[tokenId].licensingPrice, "Insufficient payment");
        
        HeritageAsset storage asset = heritageAssets[tokenId];
        uint256 totalPayment = msg.value;
        
        // Revenue distribution (40% creator, 30% community, 20% validators, 10% platform)
        uint256 creatorShare = (totalPayment * 40) / 100;
        uint256 communityShare = (totalPayment * 30) / 100;
        uint256 validatorShare = (totalPayment * 20) / 100;
        uint256 platformShare = (totalPayment * 10) / 100;
        
        // Transfer to creator
        payable(asset.creator).transfer(creatorShare);
        
        // Update earnings tracking
        asset.totalEarnings += totalPayment;
        communities[asset.communityId].totalEarnings += communityShare;
        
        emit EarningsDistributed(tokenId, creatorShare, communityShare, validatorShare);
    }

    // Register new community
    function registerCommunity(
        string memory name,
        string memory region,
        address[] memory elders
    ) external returns (uint256) {
        require(heritageAmbassadors[msg.sender], "Only ambassadors can register communities");
        
        uint256 communityId = uint256(keccak256(abi.encodePacked(name, region, block.timestamp)));
        
        Community storage community = communities[communityId];
        community.communityId = communityId;
        community.name = name;
        community.region = region;
        community.elders = elders;
        community.active = true;
        
        // Set elder community associations
        for (uint i = 0; i < elders.length; i++) {
            creatorCommunity[elders[i]] = communityId;
        }
        
        return communityId;
    }

    // Add heritage ambassador
    function addHeritageAmbassador(address ambassador) external onlyOwner {
        heritageAmbassadors[ambassador] = true;
    }

    // Get asset details
    function getAssetDetails(uint256 tokenId) external view returns (
        address creator,
        string memory culturalType,
        string memory language,
        string memory region,
        uint256 communityId,
        bool verified,
        uint256 totalEarnings,
        uint256 licensingPrice
    ) {
        require(_exists(tokenId), "Asset does not exist");
        HeritageAsset storage asset = heritageAssets[tokenId];
        
        return (
            asset.creator,
            asset.culturalType,
            asset.language,
            asset.region,
            asset.communityId,
            asset.verified,
            asset.totalEarnings,
            asset.licensingPrice
        );
    }

    // Get community assets
    function getCommunityAssets(uint256 communityId) external view returns (uint256[] memory) {
        uint256 totalSupply = _tokenIdCounter.current();
        uint256[] memory tempAssets = new uint256[](totalSupply);
        uint256 count = 0;
        
        for (uint256 i = 0; i < totalSupply; i++) {
            if (heritageAssets[i].communityId == communityId) {
                tempAssets[count] = i;
                count++;
            }
        }
        
        uint256[] memory communityAssets = new uint256[](count);
        for (uint256 j = 0; j < count; j++) {
            communityAssets[j] = tempAssets[j];
        }
        
        return communityAssets;
    }

    // Override required functions
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}