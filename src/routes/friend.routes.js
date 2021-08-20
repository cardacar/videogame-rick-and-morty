import { Router } from "express";

const route = Router();

//Envio una solicitud de amistad
router.post("/:idUser", (req, res) => {
  res.json({ message: "solicitud de amistad enviada" });
});

//Veo las solicitudes de amistad que tiene el usuario
router.get("/request", (req, res) => {
  res.json({ message: "lista solicitudes de amistad" });
});

//Agrego un amigo a la lista de amigos
router.post("/request/:idRequest", (req, res) => {
  res.json({ message: "amigo agregado" });
});

//Elimino un amigo de la lista
router.delete("/:idUser", (req, res) => {
  res.json({ message: "amigo eliminado" });
});

export default router;
