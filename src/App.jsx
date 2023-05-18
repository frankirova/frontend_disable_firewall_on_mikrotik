import { useState } from "react";

import { Form } from "./components/Form";
import { List } from "./components/List";

import { Box, Flex, Heading } from "@chakra-ui/react";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <Box>
      {currentStep == 0 && (
        <Flex direction={"column"} gap={24}>
          <Heading>CortesApp - RedMetro</Heading>
          <Form setCurrentStep={setCurrentStep} />
        </Flex>
      )}
      {currentStep == 1 && <List setCurrentStep={setCurrentStep} />}
    </Box>
  );
}
export default App;
