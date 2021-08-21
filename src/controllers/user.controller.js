//Busco los usuarios y actualizo sus datos
import User from "../models/user.model";

//Actualizacion de datos del usuario
export const updateUser = async (req, res) => {
  //Obtengo los datos del usuario
  const {
    idUser,
    fullName,
    username,
    password,
    newPassword,
    email,
    telephony,
  } = req.body;
  //Si existe algun dato para actualizar lo actualizo
  if (fullName || username || password || email || newPassword || telephony) {
    //Busco el usuario en la base de datos
    const userFound = await User.findById({ _id: idUser });
    //Si me proporcionan el username o el correo, verifico que no existan en la base de datos
    if (username || email) {
      const usernameExist = await User.findOne({ username: username });
      const emailExist = await User.findOne({ email: email });
      if (usernameExist) {
        res.json({ message: "El usuario ya existe" });
      }
      if (emailExist) {
        res.json({ message: "El correo ya existe" });
      }
    }

    //Si la contraseña fue proporcionada procedo para actualizar los datos
    if (password) {
      //Obtengo el match con la contraseña
      const mathPassword = await User.comparePassword(
        password,
        userFound.password
      );
      if (mathPassword) {
        //Creo un objeto con los datos a actualizar
        const updateUser = {
          fullName: fullName ? fullName : userFound.fullName,
          username: username ? username : userFound.username,
          password: newPassword
            ? await User.encryptPassword(newPassword)
            : userFound.password,
          email: email ? email : userFound.email,
          telephony: telephony ? telephony : userFound.telephony,
        };
        //Actualizo el usuario y mando el mensaje
        const userUpdate = await User.findByIdAndUpdate(idUser, updateUser, {
          new: true,
        });
        //Borro la contraseña
        userUpdate.password = 0;
        res.json({ message: "Usuario actualizado correctamente", userUpdate });
      } else {
        //Si las contraseñas no coinciden mando el mensaje
        res.json({ message: "La contraseña del usuario no coincide" });
      }
    } else {
      //Si la contraseña no fue proporcionada mando el mensaje
      res.json({ message: "Por favor ingrese la contraseña" });
    }
  } else {
    //De lo contrario mando el mensaje
    res.json({ message: "Por favor ingrese el dato que desea actualizar" });
  }
};

//Busqueda del usuario que se hara por el username
export const findUser = async (req, res) => {
  //Obtengo el usuario del params
  const { username } = req.params;
  //Busco el usuario en la base de datos
  const userFound = User.find({ username: username });
  //Borro la contraseña
  userFound.password = 0;
  //Si el usuario existe mando el mensaje
  if (userFound) {
    res.json({ message: "El usuario buscado es", userFound });
  }
  //Si no existe
  res.json({ message: "El usuario no existe" });
};
