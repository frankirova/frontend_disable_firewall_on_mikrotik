import {
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Context } from "./context/context";
import { useForm } from "../hooks/useForm";

export const List = () => {
  const { data, form } = useContext(Context);
  console.log(form);
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
      })
      .catch((error) => {
        showToastFail(error);
        console.error(error);
      });
  };
  return (
    <>
      <Flex alignItems="center" justifyContent="space-around" gap={6} my={6}>
        <Flex direction={"column"}>
          <Heading>Antes</Heading>
          <Text color="red">{`(${data[0].length})`}</Text>
          {data[0].map((item) => (
            <Flex direction={"column"} padding={6} key={item.ip}>
              <Text>{item.ip}</Text>
              <Text>{item.comment}</Text>
            </Flex>
          ))}
        </Flex>
        <Flex direction={"column"}>
          <Heading>Desp</Heading>
          <Text color="red">{`(${data[1].length})`}</Text>
          {data[1].map((item) => (
            <Flex direction={"column"} padding={6} key={item.ip}>
              <Text>{item.ip}</Text>
              <Text>{item.comment}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Center>
        <Button onClick={executeScript} colorScheme="blue">
          Enviar
        </Button>
      </Center>
    </>
  );
};
