import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/login.jsx";
import Home from "../pages/Home/home.jsx";
import RoomDetails from "../pages/RoomDetails/roomDetails.jsx";
import Game from "../pages/Game/game.jsx"
import Final from "../pages/Final/final.jsx";
import ComoFunciona from "../pages/Como-funciona/comoFunciona.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Register from "../pages/Register/register.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/room/:id" element={<RoomDetails />} />
      <Route path="/como-funciona" element={<ComoFunciona />} />
      <Route path="/register" element={<Register />} />


      <Route
        path="/game/:gameSessionId"
        element={
          <PrivateRoute>
            <Game />
          </PrivateRoute>} />

      <Route
        path="/game/finalizada"
        element={
          <PrivateRoute>
            < Final />
          </PrivateRoute>} />

           
    </Routes>
  );
}

export default AppRoutes