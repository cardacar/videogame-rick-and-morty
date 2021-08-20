import { Router } from "express";

const router = Router();

//Busco personaje en la api
router.get("/", (req, res) => {
  res.json({ message: "buscar personaje" });
});

//Guardo el personaje en la base de datos
router.post("/:id", (req, res) => {
  res.json({ message: "personaje guardado" });
});

//Elimino el personaje en la base de datos
router.delete("/:id", (req, res) => {
  res.json({ message: "Elimino el personaje" });
});

export default router;
