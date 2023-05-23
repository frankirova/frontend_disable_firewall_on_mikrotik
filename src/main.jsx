import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "./context/context.jsx";
import { MyNewTheme } from "./styles/theme.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={MyNewTheme}>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
