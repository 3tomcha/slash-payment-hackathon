import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    astar: {
      url: process.env.ASTAR_API_URL,
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    shibuya: {
      url: process.env.SHIBUYA_API_URL,
      accounts: [process.env.PRIVATE_KEY ?? ""],
    },
    hardhat: {
      forking: {
        url: process.env.ASTAR_API_URL ?? "",
      },
    },
  },
  etherscan: {
    apiKey: process.env.ASTAR_SCAN_API_KEY ?? "",
  },
};

export default config;
