import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Login from "./pages/Login";

import "./styles/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
