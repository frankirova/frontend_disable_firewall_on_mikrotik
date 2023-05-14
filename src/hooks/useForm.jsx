import { useState } from "react";

export const useForm = (initialValue = {}) => {
  const [formState, setFormState] = useState(initialValue);
  const [hasError, setHasError] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // const handleBlur = (e) => {
  //   handleChange(e);
  //   setHasError(validateForm(formState));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasError(validateForm(formState));
    if (Object.keys(hasError).length === 0) {
      alert("enviando formulario");
    }
  };

  const handleReset = () => {
    setFormState(initialValue);
  };

  const updateFormState = (newValue) => {
    setFormState(newValue);
  };

  return {
    formState,
    ...formState,
    handleChange,
    handleSubmit,
    handleReset,
    updateFormState,
    hasError,
    // handleBlur,
  };
};
