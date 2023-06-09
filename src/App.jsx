import { useState } from "react";

import { Form } from "./components/Form";
import { List } from "./components/List";

import { Box, Flex, Heading, Divider, Stack, Switch } from "@chakra-ui/react";
import { Footer } from "./components/Footer";
import { Aside } from "./components/Aside";

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <Box>
      {currentStep == 0 && (
        <Flex direction={"column"}>
          <Box minH="10vh">
            <Heading borderBottom="1px" p={4}>
              CortesApp - RedMetro
            </Heading>
          </Box>
          {/* <Divider colorScheme="whatsapp" /> */}
          <Flex justify="center" align="center" justifyContent="center" p={4}>
            <Form setCurrentStep={setCurrentStep} />
          </Flex>
          {/* <Aside /> */}
        </Flex>
      )}
      {currentStep == 1 && <List setCurrentStep={setCurrentStep} />}
      <Footer />
    </Box>
  );
}
export default App;
