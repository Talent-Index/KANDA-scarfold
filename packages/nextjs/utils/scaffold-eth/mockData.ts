// Mock heritage data for frontend development
export interface MockHeritage {
  tokenId: number;
  title: string;
  creator: string;
  culturalType: string;
  language: string;
  metadataURI: string;
  price: bigint;
  creatorAddress: string;
  verified: boolean;
  validatorCount: number;
  totalEarnings: bigint;
}

export const mockHeritages: MockHeritage[] = [
  {
    tokenId: 0,
    title: "The Baobab Tree Creation Story",
    creator: "Mama Amina Wanjiku",
    culturalType: "story",
    language: "kikuyu",
    metadataURI: "ipfs://QmDemo1",
    price: BigInt("10000000000000000"), // 0.01 ETH
    creatorAddress: "0x1234567890123456789012345678901234567890",
    verified: true,
    validatorCount: 1,
    totalEarnings: BigInt("50000000000000000"), // 0.05 ETH
  },
  {
    tokenId: 1,
    title: "Yoruba Wedding Blessing Songs",
    creator: "Elder Adunni Okoye",
    culturalType: "song",
    language: "yoruba",
    metadataURI: "ipfs://QmDemo2",
    price: BigInt("15000000000000000"), // 0.015 ETH
    creatorAddress: "0x2345678901234567890123456789012345678901",
    verified: true,
    validatorCount: 1,
    totalEarnings: BigInt("30000000000000000"), // 0.03 ETH
  },
  {
    tokenId: 2,
    title: "Ancient Coffee Ceremony Wisdom",
    creator: "Elder Desta Bekele",
    culturalType: "wisdom",
    language: "amharic",
    metadataURI: "ipfs://QmDemo3",
    price: BigInt("8000000000000000"), // 0.008 ETH
    creatorAddress: "0x3456789012345678901234567890123456789012",
    verified: true,
    validatorCount: 1,
    totalEarnings: BigInt("24000000000000000"), // 0.024 ETH
  },
  {
    tokenId: 3,
    title: "Maasai Warrior Coming of Age",
    creator: "Mzee Joseph Sankale",
    culturalType: "ceremony",
    language: "swahili",
    metadataURI: "ipfs://QmDemo4",
    price: BigInt("12000000000000000"), // 0.012 ETH
    creatorAddress: "0x4567890123456789012345678901234567890123",
    verified: false,
    validatorCount: 0,
    totalEarnings: BigInt("0"),
  },
  {
    tokenId: 5,
    title: "Akan Golden Stool Legend",
    creator: "Nana Akoto Bamfo",
    culturalType: "story",
    language: "akan",
    metadataURI: "ipfs://QmDemo5",
    price: BigInt("20000000000000000"), // 0.02 ETH
    creatorAddress: "0x5678901234567890123456789012345678901234",
    verified: false,
    validatorCount: 0,
    totalEarnings: BigInt("0"),
  },
];

// Helper to simulate async data fetching
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
