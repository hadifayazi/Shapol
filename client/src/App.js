import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-signup/LoginPage";
import HomePage from "./pages/homaPage/HomePage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/login-signup/Register";
import { themeSettings } from "./theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import IsAuth from "./components/IsAuth";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={IsAuth(<Register />)} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={IsAuth(<ProfilePage />)} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
