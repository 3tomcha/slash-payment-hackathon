import { useRouter } from "next/router";
import { Button, Center, Heading, Container } from "@chakra-ui/react";

export default function Thankyou() {
  const router = useRouter();
  return (
    <>
      <Container maxW="md" my="10">
        <Center my={15}>
          <Heading>Thank you!</Heading>
        </Center>
        <Center>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </Center>
      </Container>
    </>
  );
}
