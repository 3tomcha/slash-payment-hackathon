import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { astar, shibuya } from "@/utils/chains";

export default function App({ Component, pageProps }: AppProps) {
  const chains =
    process.env.NEXT_PUBLIC_NETWORK === "testnet" ? [shibuya] : [astar];
  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "";

  // Wagmi client
  const { provider } = configureChains(chains, [
    walletConnectProvider({
      projectId: projectId,
    }),
  ]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: modalConnectors({
      projectId: projectId,
      version: "2",
      appName: "web3Modal",
      chains,
    }),
    provider,
  });

  // Web3Modal Ethereum Client
  const ethereumClient = new EthereumClient(wagmiClient, chains);
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
