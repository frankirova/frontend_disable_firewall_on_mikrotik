import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box bg="whatsapp.600" minH='10vh'>
      <Container maxWidth="1200px">
        <Flex
          justify="space-between"
          align="center"
          direction={["column", "column", "row", "row"]}
          minH="10vh"
          as="footer"
          className="footer"
          bg="whatsapp.600"
        >
          <Box w="288px" />
          <Flex
            alignItems="center"
            justify="center"
            gap={2}
            as="a"
            my={[3, 3, 0, 0]}
            href="https://github.com/frankirova"
          >
            <Text fontSize="md" fontWeight="600" color="white">
              Desarrollado por
            </Text>
            <Image
              borderRadius="full"
              w="3rem"
              src="assets/logo-fr2.png"
              alt="logo-dev"
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};
