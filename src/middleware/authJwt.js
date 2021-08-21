//Verifico el token de sesion
import jwt from "jsonwebtoken";
import User from "../models/user.model";

//Middleware que me verifica si el token es correcto
export const verifyToken = async (req, res, next) => {
  try {
    //Obtengo el token de la cabecera de autorizacion
    const authorization = req.get("authorization");
    //Verifico si el token existe, si no existe envio el mensaje
    if (!authorization)
    return res.json({ message: "No existe el token" });
    
    //Verifico que la autorizacion sea correcta
    let token = {};
    if (authorization && authorization.toLowerCase().startsWith("bearer")) {
      //Limpio el token y lo asigno a la variable
      token = authorization.substring(7);
    }
    //Variable que me guarda el token decoficado
    let decodeToken = {};
    decodeToken = jwt.verify(token, process.env.SECRET_JWT);
    //Verifico si el usuario del token existe en la base de datos y elimino el password
    const user = await User.findById(decodeToken.id, { pasword: 0 });
    req.body.idUser = decodeToken.id;
    //Si el usuario no existe envio el mensaje
    if (!user)
      return res
        .json({ message: "El usuario no se ha encontrado" });
    //si todo es correcto procedo con la api
    next();
  } catch (error) {
    //Imprimo el error y muestro el mensaje
    console.error(error);
    return res.json({ message: "No tienes autorizacion" });
  }
};
