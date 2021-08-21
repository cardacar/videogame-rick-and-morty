import { Router } from "express";
import * as userCtrl from '../controllers/user.controller';
import {authJwt} from '../middleware'
//Rutas del usuario
const router = Router();

//Obtengo la lista de amigos del usuario
router.get("/", (req, res) => {
  res.json({ message: "Lista de amigos" });
});

//Obtengo la lista de amigos del usuario
router.get("/:username", (req, res) => {
  res.json({ message: "buscar" });
});
//Actualizo los datos del usuario
router.put("/", (req, res) => {
  res.json({ message: "usuario actualizado" });
});

export default router;
