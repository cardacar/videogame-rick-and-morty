import { Router } from "express";
import * as userCtrl from '../controllers/user.controller';
import {authJwt} from '../middleware'
//Rutas del usuario
const router = Router();

//Actualizo los datos del usuario
router.put("/", authJwt.verifyToken, userCtrl.updateUser);


//busco el usuario
router.get("/", userCtrl.findUser);

export default router;
