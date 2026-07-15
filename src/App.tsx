import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";

import "./styles/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
