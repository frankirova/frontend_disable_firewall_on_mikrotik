import {
  Box,
  Button,
  Center,
  Heading,
  Spinner,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Context } from "../context/context";

export const List = ({ setCurrentStep }) => {
  const { data, form } = useContext(Context);
  const toast = useToast();

  if (!data || !data[0]) {
    return (
      <Center>
        <Spinner>Cargando...</Spinner>
      </Center>
    );
  }

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
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
        Origin: url,
      },
      mode: "no-cors",
    })
      .then(() => {
        showToastSuccess();
        setCurrentStep(0);
      })
      .catch((error) => {
        showToastFail(error);
        console.error(error);
      });
  };

  return (
    <Table>
      <Thead>
        <Tr display="flex" justifyContent="space-around">
          <Th>
            <Heading>Antes</Heading>
            <Tag
              colorScheme="red"
              paddingX={2}
              paddingY={1}
            >{`(${data[0].length})`}</Tag>
          </Th>

          <Th>
            <Heading>Despues</Heading>
            <Tag
              colorScheme="red"
              paddingX={2}
              paddingY={1}
            >{`(${data[1].length})`}</Tag>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr display="flex">
          <Td>
            {data[0].map((item) => (
              <Box
                minH="110px"
                padding={6}
                boxShadow="0 0 0 1px gray"
                borderRadius="md"
                bg="green.400"
                fontWeight="bold"
                my={4}
              >
                <Text>{item.ip}</Text>
                <Text>{item.comment}</Text>
              </Box>
            ))}
          </Td>
          <Td>
            {data[1].map((item) => (
              <Box
                minH="110px"
                padding={6}
                boxShadow="0 0 0 1px gray"
                borderRadius="md"
                bg="green.400"
                // color='white'
                fontWeight="bold"
                // color={item.isDifferent ? "red.200" : "green.200"}
                my={4}
              >
                <Text>{item.ip}</Text>
                <Text>{item.comment}</Text>
              </Box>
            ))}
          </Td>
        </Tr>
      </Tbody>
      <Center>
        <Button
          onClick={executeScript}
          colorScheme="whatsapp"
          size="lg"
          width="20rem"
          mb={8}
          mt={4}
        >
          Enviar
        </Button>
      </Center>
    </Table>
  );
};
