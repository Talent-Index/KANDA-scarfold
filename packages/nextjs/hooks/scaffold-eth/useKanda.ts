import type { Address } from "viem";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const useKanda = () => {
  const { address } = useAccount();

  const { data: allHeritages, isLoading } = useScaffoldReadContract({
    contractName: "KandaHeritage",
    functionName: "getAllHeritages",
    query: {
      enabled: true,
    },
  });

  const { data: myHeritages } = useScaffoldReadContract({
    contractName: "KandaHeritage",
    functionName: "getMyHeritages",
    args: [address || ("0x0000000000000000000000000000000000000000" as Address)],
    query: {
      enabled: !!address,
    },
  });

  const { data: isValidator } = useScaffoldReadContract({
    contractName: "KandaHeritage",
    functionName: "isValidator",
    args: [address || ("0x0000000000000000000000000000000000000000" as Address)],
    query: {
      enabled: !!address,
    },
  });

  const { writeContractAsync: mintHeritage, isMining: isMinting } = useScaffoldWriteContract({
    contractName: "KandaHeritage",
  });

  const { writeContractAsync: verifyHeritage, isMining: isVerifying } = useScaffoldWriteContract({
    contractName: "KandaHeritage",
  });

  const { writeContractAsync: licenseHeritage, isMining: isLicensing } = useScaffoldWriteContract({
    contractName: "KandaHeritage",
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
