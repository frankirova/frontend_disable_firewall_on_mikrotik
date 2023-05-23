import { extendTheme } from "@chakra-ui/react";

export const MyNewTheme = extendTheme({
  colors: {
    light: {
      bg: "white",
      text: "black",
    },
    dark: {
      bg: "gray.800",
      text: "white",
    },
  },
});
