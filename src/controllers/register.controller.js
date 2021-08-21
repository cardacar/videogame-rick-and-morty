//Creacion de usuarios
import User from "../models/user.model";
import jwt from "jsonwebtoken";
//Funcion para crear los usuarios
export const createUser = async (req, res) => {
  //Obtengo los datos para crear el usuario del body
  const { fullName, username, password, email, telephony } = req.body;
  
  //Realizo una busqueda para saber si username existe
  const usernameFound = await User.findOne({ username: username });
  //Si existe envio un mensaje
  if (usernameFound) return res.json({ message: "El username ya existe" });
  //Busco si el correo existe
  const emailFound = await User.findOne({ email: email });
  //Si el correo existe envio un mensaje
  if (emailFound) return res.json({ message: "El email ya existe" });

  //Si el usuario no existe
  //Creo un objeto con los datos para la creacion del usuario y encripto la contraseña
  const newUser = new User({
    fullName,
    username,
    password: await User.encyptPassword(password),
    email,
    telephony,
  });
  //Guardo el usuario en la base de datos
  const userSave = await newUser.save();
  //Creo el token con el usuario creado con duracion de 1 dia
  const token = jwt.sign({ user: userSave._id }, process.env.SECRET_JWT, {
    expiresIn: 60 * 60 * 24,
  });
  //Envio el mensaje y el token de sesion
  res.json({ message: "El usuario se creo satisfactoriamente", token });
};
