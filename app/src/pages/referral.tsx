import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { Button, Center, Stack, Container, Input } from "@chakra-ui/react";

export default function Referral() {
  const router = useRouter();
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [hasMounted, setHasMounted] = useState(false);
  const [displayAddress, setDisplayAddress] = useState("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    console.log(address);
    if (address) {
      setDisplayAddress(
        `${address.substring(0, 4)}...${address.substring(address.length - 5)}`
      );
    }
  }, [address]);

  if (!hasMounted) return null;
  return (
    <>
      <Container maxW="md" my="10">
        <Stack my="6" spacing="3">
          <Input placeholder="referral code" />
          <Input placeholder="receiving wallet address" />
          {isConnected ? (
            <>
              <Button onClick={() => open()}>{displayAddress}</Button>
            </>
          ) : (
            <>
              <Button onClick={() => open()}>Connect Wallet</Button>
            </>
          )}

          <Button isDisabled={!isConnected} onClick={() => router.push("/")}>
            Create!!
          </Button>
        </Stack>

        <Center>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </Center>
      </Container>
    </>
  );
}
