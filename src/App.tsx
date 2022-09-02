import "./app.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
import Toolbar from "./components/layout/Toolbar";
import Register from "./components/pages/Auth/Register";
import Login from "./components/pages/Auth/Login";
import HomeButton from "./components/layout/HomeButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { expiredToken, refresh } from "./store/userSlice";
import Account from "./components/pages/Account";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      let decode;
      try {
        decode = JSON.parse(atob(token.split(".")[1]));
      } catch {
        localStorage.removeItem("token");
        return;
      }
      if (decode.exp * 1000 < new Date().getTime()) {
        dispatch(expiredToken());
        return;
      }

      dispatch(refresh({ token, data: decode }));
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Routes>
      <HomeButton />
      <Toolbar />
    </BrowserRouter>
  );
}

export default App;
