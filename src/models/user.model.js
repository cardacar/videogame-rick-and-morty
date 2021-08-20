import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

//Creacion del modelo de usuario
const userSchema = new Schema(
  {
    fullName: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    addedFriends: [
      {
        //Amigos agregados, hace referencia al modelo de amigos
        ref: "friend",
        type: Schema.Types.ObjectId,
      },
    ],
    requestFriends: [
      {
        //Solicitud de amistad, hace referencia al model de amigos
        ref: "friend",
        type: Schema.Types.ObjectId,
      },
    ],
    character: [
      {
        //Personaje seleccionado para guardar
        ref: "characterInfo",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    //timestamps en true para tener los datos de los tiempos del CRUD
    timestamps:true,
    versionKey: false
  }
);


//Encripto la contraseña
userSchema.static.encyptPassword = async (password) => {
  //Obtengo la salt
  const salt = await bcrypt.genSalt(process.env.SALT_BCRYPT);
  //Encripto la contraseña y la retorno
  return await bcrypt.hash(password, salt);
};

//Comparo las contraseñas para saber si coincide con el hash
userSchema.static.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

export default model("user", userSchema);
