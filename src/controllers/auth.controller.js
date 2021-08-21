//inicio de sesion
import User from "../models/user.model";
import jwt from "jsonwebtoken";

//Funcion que sirve para el inicio de sesion
export const sigIn = async (req, res) => {
  //Obtengo los parametros necesarios para el inicio de sesion del body
  const { username, password } = req.body;

  //Primero busco el usuario en la bd para saber si existe
  const userFound = await User.findOne({ username: username });

  //Si el usuario no existe le mando el mensaje
  if (!userFound) return res.json({ message: "Usuario o contraseña invalida" });

  //Ahora como el usuario existe, comparo las contraseñas
  const passwordMatch = await User.comparePassword(
    password,
    userFound.password
  );

  //Si las contraseñas no coinciden devuelvo el mensaje
  if (!passwordMatch)
    return res.json({ message: "Usuario o contraseña invalida" });

  //Si el usuario existe y la contraseña coincide creo que el token de sesion con el id del usuario
  const token = jwt.sign({ id: userFound._id }, process.env.SECRET_JWT, {
    expiresIn: 60 * 60 * 2,
  });

  //Devuelvo el token de sesion
  res.json({ token });
};
