import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login-signup/LoginPage";
import HomePage from "./pages/homaPage/HomePage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
