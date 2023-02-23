import { ethers } from "hardhat";

async function main() {
  const ReferralExtension = await ethers.getContractFactory(
    "ReferralExtension"
  );
  const referralExtension = await ReferralExtension.deploy();
  await referralExtension.deployed();

  console.log(`deployed to ${referralExtension.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
