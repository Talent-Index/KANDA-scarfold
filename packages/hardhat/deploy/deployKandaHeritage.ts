import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployKandaHeritage: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  console.log("Deploying KandaHeritage with account:", deployer);

  const kandaHeritage = await deploy("KandaHeritage", {
    from: deployer,
    args: [], // No constructor arguments needed
    log: true,
    autoMine: true,
  });

  console.log(`👑 KandaHeritage deployed to: ${kandaHeritage.address}`);

  // Get the deployed contract to verify it works
  const KandaHeritageContract = await hre.ethers.getContract<Contract>("KandaHeritage", deployer);

  console.log(`📋 Contract name: ${await KandaHeritageContract.name()}`);
  console.log(`🎯 Contract symbol: ${await KandaHeritageContract.symbol()}`);
  console.log(`👴 Deployer is validator: ${await KandaHeritageContract.isValidator(deployer)}`);
};

export default deployKandaHeritage;
deployKandaHeritage.tags = ["KandaHeritage"];
