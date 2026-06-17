import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/login.jsx";
import Home from "../pages/Home/home.jsx";
import RoomDetails from "../pages/RoomDetails/roomDetails.jsx";
import Game from "../pages/Game/game.jsx"
import Final from "../pages/Final/final.jsx";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/room/:id" element={<RoomDetails />}/>
      <Route path="/game/:gameSessionId" element={< Game/>}/>
      <Route path="/game/finalizada" element={ < Final/>}/>
    </Routes>
  );
}

export default AppRoutes