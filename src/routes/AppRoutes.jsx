import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/login.jsx";
import Home from "../pages/Home/home.jsx";
import RoomDetails from "../pages/RoomDetails/roomDetails.jsx";
import Game from "../pages/Game/game.jsx"
import Final from "../pages/Final/final.jsx";
import ComoFunciona from "../pages/Como-funciona/comoFunciona.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Cadastro from "../pages/Cadastro/cadastro.jsx";
import Sobre from "../pages/Sobre/sobre.jsx";
import AjudeNos from "../pages/AjudeNos/ajudeNos.jsx";
import Perfil from "../pages/Perfil/perfil.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/room/:id" element={<RoomDetails />} />
      <Route path="/como-funciona" element={<ComoFunciona />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/desenvolvedor" element={<Sobre />} />
      <Route path="/ajude-nos" element={<AjudeNos />} />

      <Route
        path="/game/:gameSessionId"
        element={
          <PrivateRoute>
            <Game />
          </PrivateRoute>} />

      <Route
        path="/game/:gameSessionId/finalizada"
        element={
          <PrivateRoute>
            < Final />
          </PrivateRoute>} />


      <Route 
        path="/perfil"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        } />
           
    </Routes>
  );
}

export default AppRoutes