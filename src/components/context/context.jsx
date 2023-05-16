import { createContext, useState } from "react";

export const Context = createContext({});
export const Provider = ({ children }) => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const updateForm = (datito) => {
    setForm(datito);
  };
  const updateData = (datito) => {
    setData(datito);
  };

  return (
    <Context.Provider
      value={{
        updateData,
        data,
        updateForm,
        form,
      }}
    >
      {children}
    </Context.Provider>
  );
};
