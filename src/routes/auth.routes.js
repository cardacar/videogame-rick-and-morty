import { Router } from "express";

const router = Router();

//Inicio de sesion, devuelve token jwt
router.post("/", (req, res) => {
  res.json({ message: "Inicio de sesion" });
});

export default router;
