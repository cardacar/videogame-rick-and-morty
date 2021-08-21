import { Router } from "express";
import * as friendCtrl from "../controllers/friend.controller"
import {authJwt} from '../middleware'
const router = Router();

//Envio una solicitud de amistad
router.put("/addFriend/:username", authJwt.verifyToken,friendCtrl.addFriends);

//Elimino un amigo de la lista, actualizar los datos de la lista de amigos
router.put("/:username", authJwt.verifyToken, friendCtrl.deleteFriend);

export default router;
