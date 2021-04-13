import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import middleware from "./middleware";
import reducer from "./reducers";
import App from "./components/App";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
