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
import { useContext, useState } from "react";
import { Context } from "./context/context";

export const List = ({ setCurrentStep }) => {
  const { data, form } = useContext(Context);
  const toast = useToast();

  // const [highlightedAfter, setHighlightedAfter] = useState([]);
  if (!data || !data[0]) {
    return (
      <Center>
        <Spinner>Cargando...</Spinner>
      </Center>
    );
  }

  // const highlightDifferences = () => {
  //   const differences = data[1].filter(
  //     (item1) => !data[0].some((item2) => item1.id === item2.id)
  //   );
  //   const highlightedAfter = data[1].map((item) => {
  //     const isDifferent = differences.some((diff) => diff.id === item.id);
  //     return { ...item, isDifferent };
  //   });
  //   setHighlightedAfter(highlightedAfter);
  // };

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
                bg="green.200"
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
                bg="green.200"
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
        <Button onClick={executeScript} colorScheme="blue" my={4}>
          Enviar
        </Button>
        {/* <Button onClick={highlightDifferences} colorScheme="blue" my={4}>
          Ver
        </Button> */}
      </Center>
    </Table>
  );
};
