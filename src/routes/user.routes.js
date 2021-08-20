import { Router } from "express";
//Rutas del usuario
const router = Router();

//Obtengo la lista de amigos del usuario
router.get("/", (req, res) => {
  res.json({ message: "Lista de amigos" });
});
//Actualizo los datos del usuario
router.put("/", (req, res) => {
  res.json({ message: "usuario actualizado" });
});

export default router;
