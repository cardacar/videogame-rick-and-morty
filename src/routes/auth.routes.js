import { Router } from "express";
import * as authCtrol from '../controllers/auth.controller'

const router = Router();

//Inicio de sesion, devuelve token jwt
router.post("/", authCtrol.sigIn);

export default router;
