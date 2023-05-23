import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

export const ModalNewOption = ({
  isOpen,
  onClose,
  handleAddOption,
  handleChangeOption,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar opción</ModalHeader>
        <ModalBody>
          <Input
            name="option"
            onChange={handleChangeOption}
            placeholder="Ingrese una opción"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="whatsapp" onClick={handleAddOption}>
            Guardar
          </Button>
          <Button
            colorScheme="whatsapp"
            variant="ghost"
            ml={2}
            onClick={onClose}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
