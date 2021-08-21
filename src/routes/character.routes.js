import { Router } from "express";
import * as characterCtrl from "../controllers/character.controller";
import {authJwt} from '../middleware'
const router = Router();

//Busco personaje en la api
router.get("/:nameCharacter", characterCtrl.findCharacter);
router.get("/", (req, res) => {
  res.json({ message: "Por favor ingrese un personaje" });
});

//Guardo el personaje en la base de datos
router.post("/:id", authJwt.verifyToken, characterCtrl.saveCharacter);

//Elimino el personaje en la base de datos
router.delete("/:id", authJwt.verifyToken, characterCtrl.deleteCharacter);

export default router;
