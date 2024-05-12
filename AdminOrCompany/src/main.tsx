import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ChakraProvider } from "@chakra-ui/react";
import { GlobalContextProvider } from "./Context/GlobalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <ChakraProvider>
        <Provider store={store}>
          <GlobalContextProvider>
            <App />
          </GlobalContextProvider>
        </Provider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>
);
