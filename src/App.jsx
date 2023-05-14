import { useEffect, useState } from "react";
import "./App.css";
import { useForm } from "./hooks/useForm";

function App() {
  const { handleChange, formState } = useForm();

  const url = "http://localhost:8000";

  const executeScript = (event) => {
    event.preventDefault(); // Evita que el formulario se envíe por defecto
    fetch("http://localhost:8000/script", {
      method: "POST",
      body: JSON.stringify(formState),
      headers: {
        "Content-Type": "application/json",
        Origin: url, // Asegúrate de incluir el encabezado Origin
      },
      mode: "no-cors",
    })
      .then((data) => {
        // Aquí puedes hacer algo con la respuesta de la API
        console.log(data);
      })
      .catch((error) => {
        // Aquí puedes manejar errores que ocurran durante la solicitud a la API
        console.error(error);
      });
      console.log(formState)
    };

  return (
    <>
      <form onSubmit={executeScript}>
        <label>ip mikrotik</label>
        <input onChange={handleChange} name="IP_MIKROTIK" type="text" />

        <label>nombre de la hoja</label>
        <input onChange={handleChange} name="SPREADSHEET_NAME" type="text" />
        <button type="submit">submit</button>
      </form>
    </>
  );
}
export default App;
