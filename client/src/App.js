import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Board from "./pages/Board";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </>
  );
};

export default App;
