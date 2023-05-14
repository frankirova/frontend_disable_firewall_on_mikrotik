import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "./hooks/useForm";

function App() {
  const toast = useToast();
  const { handleChange, formState } = useForm();
  const url = "http://localhost:8000";

  const showToastSuccess = () => {
    toast({
      description: "Realizado",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const showToastFail = (error) => {
    toast({
      title: "Error",
      description: `${error}`,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const executeScript = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/script", {
      method: "POST",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
        Origin: url,
      },
      mode: "no-cors",
    })
      .then(() => {
        showToastSuccess();
      })
      .catch((error) => {
        showToastFail(error);
        console.error(error);
      });
  };
  const options = [
    "192.168.2.238",
    "64.76.121.146",
    "64.76.121.147",
    "64.76.121.143",
    "64.76.121.243",
    "168.194.32.50",
    "168.194.32.71",
    "168.194.32.21",
    "168.194.32.14",
    "168.194.34.196",
    "168.194.34.197",
  ];

  return (
    <Container>
      <Flex direction={"column"} gap={6}>
        <Heading>CortesApp - RedMetro</Heading>
        <form onSubmit={executeScript}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>IP MIKROTIK</FormLabel>
              <Select
                placeholder="Seleccione una opción"
                onChange={handleChange}
                name="IP_MIKROTIK"
                value={formState.IP_MIKROTIK}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>NOMBRE DE LA HOJA</FormLabel>
              <Input
                type="text"
                name="SPREADSHEET_NAME"
                value={formState.SPREADSHEET_NAME}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue">
              Enviar
            </Button>
          </VStack>
        </form>
      </Flex>
    </Container>
  );
}
export default App;
