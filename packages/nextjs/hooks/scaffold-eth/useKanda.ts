


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
