import { useRouter } from "next/router";
import axios from "axios";
import {
  Image,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Stack,
  Text,
  Flex,
  Spacer,
  Container,
  Input,
} from "@chakra-ui/react";

export default function Home() {
  const router = useRouter();
  const callCheckout = async () => {
    const result = await axios.post("api/paymentUrl");
    if (result.status === 200) {
      window.location = result.data.paymentUrl;
    } else {
      alert(
        "You have already started this payment. Please continue the payment or start from order again."
      );
    }
  };
  return (
    <>
      <Container maxW="md" my="10">
        <Card maxW="md" my="10">
          <CardBody>
            <Stack mt="6" spacing="1">
              <Heading size="md">Experience BackSlash !</Heading>
              <Text>BackSlash is a referral program using Slash Payment.</Text>
              <Text>
                First, a referral code is issued by the Slash extension. When
                the referral code is entered at the time of payment, cash back
                is given to the buyer and the referrer.
              </Text>
              <Text color="blue.600" fontSize="2xl">
                ${process.env.NEXT_PUBLIC_PRICE}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <Center>
            <CardFooter>
              <Stack>
                <Input placeholder="referral code" />
                <Box>
                  <button onClick={callCheckout}>
                    <Image src="/paymentButton.png" alt="me" htmlWidth="200" />
                  </button>
                </Box>
              </Stack>
            </CardFooter>
          </Center>
        </Card>
        <Center>
          <Button onClick={() => router.push("/referral")}>
            Issue Referral Code
          </Button>
        </Center>
      </Container>
    </>
  );
}
