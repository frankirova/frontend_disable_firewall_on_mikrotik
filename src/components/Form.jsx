import { useContext, useState } from "react";
import { useForm } from "../hooks/useForm";

import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Context } from "./context/context";

export const Form = ({ setCurrentStep }) => {
  const { updateData, updateForm } = useContext(Context);
  const { handleChange, formState } = useForm();
  const [apiError, setApiError] = useState();

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

  const preview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        // La llamada a la API fue exitosa
        setApiError("");
        const data = await response.json();
        updateData(data);
        updateForm(formState)
        setCurrentStep(1);
        // Continuar con el flujo deseado
      } else if (response.status === 404) {
        // La llamada a la API devolvió un código de respuesta 404
        setApiError("Error: API responded with 404");
        updateData(null);
      } else {
        // Otro código de respuesta de error
        setApiError("Error: API responded with an unknown error");
        updateData(null);
      }
    } catch (error) {
      // Error de red u otro error no esperado
      setApiError("Error: Failed to call the API");
      updateData(null);
    }
    // updateForm(formState);
    // fetch("http://localhost:8000/preview", {
    //   method: "POST",
    //   body: JSON.stringify(formState),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Origin: "http://localhost:8000", // Asegúrate de incluir el encabezado Origin
    //   },
    //   mode: "cors",
    // })
    //   .then((response) => response.json())
    //   .then((data) => updateData(data))
    //   .catch((error) => console.log(error));
  };

  return (
    <Container>
      {apiError && (
        <Text color="red" my={2}>
          {apiError}
        </Text>
      )}
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

          <FormControl>
            <Input type="date" />
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
