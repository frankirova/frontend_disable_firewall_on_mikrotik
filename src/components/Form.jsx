import { useContext, useEffect, useState } from "react";
import { Context } from "../context/context";
import { useForm } from "../hooks/useForm";
import { ModalNewOption } from "./ModalNewOption";

import {
  Select,
  Input,
  Button,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Container,
  Text,
  Flex,
} from "@chakra-ui/react";

export const Form = ({ setCurrentStep }) => {
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState({});
  const [apiError, setApiError] = useState("");
  const [optionAdded, setOptionAdded] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateData, updateForm } = useContext(Context);
  const { handleChange, formState } = useForm();

  const handleChangeOption = ({ target: { name, value } }) => {
    setNewOption({
      ...newOption,
      [name]: value,
    });
  };

  const readOptions = async () => {
    try {
      const url = "http://localhost:8000/readOptions";
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(url, requestOptions);

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const result = await response.json();
        setOptions(result.data); // Mostrar el mensaje de éxito en la consola
      } else {
        throw new Error("Error al agregar los datos a la base de datos");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addOption = async () => {
    // Función para llamar a la API y agregar los datos a la base de datos
    try {
      const url = "http://localhost:8000/addDoc";
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOption),
      };

      // Realizar la solicitud al servidor
      const response = await fetch(url, requestOptions);

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        const result = await response.json();
        console.log(result.data); // Mostrar el mensaje de éxito en la consola
      } else {
        throw new Error("Error al agregar los datos a la base de datos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (optionAdded) {
      readOptions();
      setOptionAdded(false);
    }
  }, [optionAdded]);

  const handleAddOption = (e) => {
    e.preventDefault();
    if (newOption) {
      addOption();
      setOptionAdded(true);
      onClose();
    }
  };

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
        setApiError("");
        const data = await response.json();
        updateData(data);
        updateForm(formState);
        setCurrentStep(1);
      } else if (response.status === 500) {
        setApiError(
          "Error al conectarse con la API. Revisar los datos del formulario"
        );
        updateData(null);
      } else {
        setApiError("Error: API responded with an unknown error");
        updateData(null);
      }
    } catch (error) {
      showToastFail(error.message);
      updateData(null);
    }
  };
  console.log(formState);
  return (
    <Container minHeight="80vh">
      <ModalNewOption
        onClose={onClose}
        isOpen={isOpen}
        handleAddOption={handleAddOption}
        handleChangeOption={handleChangeOption}
        newOption={newOption}
      />
      {apiError && (
        <Text color="red" my={2}>
          {apiError}
        </Text>
      )}
      <form onSubmit={preview}>
        <VStack spacing={4} align="stretch" justify="center">
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
            <FormLabel>FECHA</FormLabel>
            <Input
              type="date"
              onChange={handleChange}
              name="DATE"
              value={formState.DATE}
            />
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
          <Button type="submit" colorScheme="whatsapp">
            Siguiente
          </Button>
          <Button colorScheme="whatsapp" variant="ghost" onClick={onOpen}>
            Agregar mikrotik
          </Button>
        </VStack>
      </form>
    </Container>
  );
};
