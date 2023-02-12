import { Chain, polygon } from "wagmi/chains";

const astar: Chain = {
  id: 592,
  name: "Astar",
  network: "Astar",
  nativeCurrency: {
    name: "ASTR",
    symbol: "ASTR",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://evm.astar.network"],
      webSocket: ["wss://rpc.astar.network"],
    },
    public: {
      http: ["https://evm.astar.network"],
      webSocket: ["wss://rpc.astar.network"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Blockscout",
      url: "https://blockscout.com/astar/",
    },
    default: {
      name: "Blockscout",
      url: "https://blockscout.com/astar/",
    },
  },
  testnet: false,
};
const shibuya: Chain = {
  id: 81,
  name: "Shibuya",
  network: "Shibuya",
  nativeCurrency: {
    name: "SBY",
    symbol: "SBY",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://evm.shibuya.astar.network"],
      webSocket: ["wss://rpc.shibuya.astar.network"],
    },
    public: {
      http: ["https://evm.shibuya.astar.network"],
      webSocket: ["wss://rpc.shibuya.astar.network"],
    },
  },
  blockExplorers: {
    etherscan: {
      name: "Subscan",
      url: "https://shibuya.subscan.io/",
    },
    default: {
      name: "Subscan",
      url: "https://shibuya.subscan.io/",
    },
  },
  testnet: true,
};

export { astar, shibuya };
