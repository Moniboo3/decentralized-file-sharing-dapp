const hre = require("hardhat");

async function main() {
  const FileSharing = await hre.ethers.getContractFactory("FileSharing");
  console.log("Deploying FileSharing contract...");

  const fileSharingContract = await FileSharing.deploy();
  console.log("Waiting for contract deployment...");

  const receipt = await fileSharingContract.deployTransaction.wait();
  if (!receipt.contractAddress) {
    console.error("Contract deployment failed");
    return;
  }

  console.log("FileSharing contract deployed to:", receipt.contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });