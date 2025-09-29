"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { MockHeritage, delay, mockHeritages } from "~~/utils/scaffold-eth/mockData";

// Mock hook that simulates contract interactions
export const useKanda = () => {
  const { address } = useAccount();

  // State for mock data
  const [allHeritages, setAllHeritages] = useState<MockHeritage[]>(mockHeritages);
  const [isLoading, setIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLicensing, setIsLicensing] = useState(false);

  // Simulate loading data
  useEffect(() => {
    setIsLoading(true);
    delay(500).then(() => setIsLoading(false));
  }, []);

  // Get user's heritages (mock)
  const myHeritages = allHeritages
    .filter(h => h.creatorAddress.toLowerCase() === address?.toLowerCase())
    .map(h => BigInt(h.tokenId));

  // Check if user is validator (mock - first connected wallet is validator)
  const isValidator =
    address === "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" ||
    address?.toLowerCase() === mockHeritages[0].creatorAddress.toLowerCase();

  // Mock mint function
  const mintHeritage = async ({ args }: { args: [string, string, string, string, string, bigint] }) => {
    setIsMinting(true);
    await delay(2000); // Simulate transaction

    const [title, creator, culturalType, language, metadataURI, price] = args;

    const newHeritage: MockHeritage = {
      tokenId: allHeritages.length,
      title,
      creator,
      culturalType,
      language,
      metadataURI,
      price,
      creatorAddress: address || "0x0000000000000000000000000000000000000000",
      verified: false,
      validatorCount: 0,
      totalEarnings: BigInt("0"),
    };

    setAllHeritages(prev => [...prev, newHeritage]);
    setIsMinting(false);

    console.log("✅ Mock: Heritage minted", newHeritage);
    return { hash: "0xmockhash123" };
  };

  // Mock verify function
  const verifyHeritage = async ({ args }: { args: [bigint] }) => {
    setIsVerifying(true);
    await delay(1500); // Simulate transaction

    const [tokenId] = args;

    setAllHeritages(prev =>
      prev.map(h => (h.tokenId === Number(tokenId) ? { ...h, verified: true, validatorCount: 1 } : h)),
    );

    setIsVerifying(false);
    console.log("✅ Mock: Heritage verified", tokenId);
    return { hash: "0xmockhash456" };
  };

  // Mock license function
  const licenseHeritage = async ({ args, value }: { args: [bigint]; value: bigint }) => {
    setIsLicensing(true);
    await delay(2000); // Simulate transaction

    const [tokenId] = args;

    setAllHeritages(prev =>
      prev.map(h => (h.tokenId === Number(tokenId) ? { ...h, totalEarnings: h.totalEarnings + value } : h)),
    );

    setIsLicensing(false);
    console.log("✅ Mock: Heritage licensed", tokenId, "for", value);
    return { hash: "0xmockhash789" };
  };

  return {
    // Data
    allHeritages,
    myHeritages,
    isValidator,

    // Functions
    mintHeritage,
    verifyHeritage,
    licenseHeritage,

    // Loading states
    isLoading,
    isMinting,
    isVerifying,
    isLicensing,
  };
};

// WHEN SMART CONTRACT IS READY, REPLACE THIS FILE WITH:
/*
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";

export const useKanda = () => {
  const { address } = useAccount();

  const { data: allHeritages, isLoading } = useScaffoldContractRead({
    contractName: "KandaHeritage",
    functionName: "getAllHeritages",
  });

  const { data: myHeritages } = useScaffoldContractRead({
    contractName: "KandaHeritage",
    functionName: "getMyHeritages",
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const { data: isValidator } = useScaffoldContractRead({
    contractName: "KandaHeritage",
    functionName: "isValidator",
    args: address ? [address] : undefined,
    enabled: !!address,
  });

  const { writeAsync: mintHeritage, isMining: isMinting } = useScaffoldContractWrite({
    contractName: "KandaHeritage",
    functionName: "mintHeritage",
  });

  const { writeAsync: verifyHeritage, isMining: isVerifying } = useScaffoldContractWrite({
    contractName: "KandaHeritage",
    functionName: "verifyHeritage",
  });

  const { writeAsync: licenseHeritage, isMining: isLicensing } = useScaffoldContractWrite({
    contractName: "KandaHeritage",
    functionName: "licenseHeritage",
  });

  return {
    allHeritages,
    myHeritages,
    isValidator,
    mintHeritage,
    verifyHeritage,
    licenseHeritage,
    isLoading,
    isMinting,
    isVerifying,
    isLicensing,
  };
};
*/
