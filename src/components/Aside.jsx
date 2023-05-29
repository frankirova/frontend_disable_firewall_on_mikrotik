import { Box, Button, Flex } from "@chakra-ui/react";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const Aside = () => {
  return (
    <Box
      as="aside"
      width="5vw"
      minH="100vh"
      bg="gray.100"
      pos="absolute"
      right="0"
      bottom="0"
    >
      <Flex gap={3} direction="column">
        <Flex align="center" justify="center" mt="6rem">
          <Button colorScheme="whatsapp" height="4rem" width='4rem'>
            <CheckCircleIcon width="3.5rem" />
          </Button>
        </Flex>
        <Flex align="center" justify="center">
          <Button colorScheme="whatsapp" height="4rem" width='4rem'>
            <XMarkIcon width="3.5rem" />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};
