import { Router } from "express";
import * as userCtrl from '../controllers/user.controller';
import {authJwt} from '../middleware'
//Rutas del usuario
const router = Router();

//Actualizo los datos del usuario
router.put("/", authJwt.verifyToken, userCtrl.updateUser);

//Obtengo la lista de amigos del usuario
router.get("/:username", (req, res) => {
  res.json({ message: "buscar" });
});
//Actualizo los datos del usuario
router.put("/", (req, res) => {
  res.json({ message: "usuario actualizado" });
});

export default router;
