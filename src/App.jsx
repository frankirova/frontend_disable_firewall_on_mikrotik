import { useState } from "react";

import { Form } from "./components/Form";
import { List } from "./components/List";

import { Box, Flex, Heading, Divider, Stack, Switch } from "@chakra-ui/react";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <Box>
      {currentStep == 0 && (
        <Flex direction={"column"} gap={6}>
            <Heading>CortesApp - RedMetro</Heading>
          <Divider colorScheme="whatsapp" />
          <Flex justify="center" align="center" minH="70vh">
            <Form setCurrentStep={setCurrentStep} />
          </Flex>
        </Flex>
      )}
      {currentStep == 1 && <List setCurrentStep={setCurrentStep} />}
    </Box>
  );
}
export default App;
