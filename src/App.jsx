import Router from "./pages/Router";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkMode, lightMode } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkModeState } from "./atom";

function App() {
  const isDarkMode = useRecoilValue(isDarkModeState);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={isDarkMode ? darkMode : lightMode}>
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
