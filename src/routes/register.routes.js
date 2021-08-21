//Rutas para el registro de usuarios y el inicio de sesion
import { Router } from "express";
import * as registerCtrl from '../controllers/register.controller'
const router = Router();

//Creacion del usuario
router.post("/", registerCtrl.createUser);

export default router;
