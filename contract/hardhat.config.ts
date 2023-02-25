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
    mumbai: {
      url: process.env.MUMBAI_API_URL,
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
    customChains: [
      {
        network: "astar",
        chainId: 592,
        urls: {
          apiURL: "https://blockscout.com/astar/api",
          browserURL: "https://blockscout.com/astar",
        },
      },
      {
        network: "shibuya",
        chainId: 81,
        urls: {
          apiURL: "https://blockscout.com/shibuya/api",
          browserURL: "https://blockscout.com/shibuya",
        },
      },
    ],
  },
};

export default config;
