import { createContext, useState } from "react";

export const Context = createContext({});
export const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [newOption, setNewOption] = useState();
  const updateForm = (datito) => {
    setForm(datito);
  };
  const updateData = (datito) => {
    setData(datito);
  };
  // const updateOptions = (datito) => {
  //   setNewOption(datito)
  // };
  return (
    <Context.Provider
      value={{
        updateData,
        data,
        updateForm,
        form,
        // updateOptions,
        // newOption,
      }}
    >
      {children}
    </Context.Provider>
  );
};
