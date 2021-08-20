import { Router } from "express";
//Rutas para el registro de usuarios y el inicio de sesion
const router = Router();

//Creacion del usuario
router.post("/", (req, res) => {
  res.json({ message: "creacion del usuario" });
});

export default router;
