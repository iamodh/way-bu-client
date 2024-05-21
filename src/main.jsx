import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyles from "./global";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    color: blue;
  }
`

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>
);
