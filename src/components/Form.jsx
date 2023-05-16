import { useContext, useState } from "react";
import { useForm } from "../hooks/useForm";

import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Context } from "./context/context";

export const Form = ({ setCurrentStep }) => {
  const { updateData, updateForm } = useContext(Context);

  const { handleChange, formState } = useForm();

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

  const preview = (e) => {
    e.preventDefault();
    updateForm(formState)
    fetch("http://127.0.0.1:8000/preview", {
      method: "POST",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:8000", // Asegúrate de incluir el encabezado Origin
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {updateData(data)})
      .catch((error) => console.log(error));
    setCurrentStep(1);
  };

  return (
    <Container>
      <form onSubmit={preview}>
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
            Siguiente
          </Button>
        </VStack>
      </form>
    </Container>
  );
};
