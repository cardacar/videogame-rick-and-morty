import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

//Creacion del modelo de usuario
const userSchema = new Schema(
  {
    fullName: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true },
    telephony: { type: String, require: false },
    addedFriends: [
      {
        //Amigos agregados
        ref: "user",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    //timestamps en true para tener los datos de los tiempos del CRUD
    timestamps: true,
    versionKey: false,
  }
);

//Encripto la contraseña
userSchema.statics.encyptPassword = async (password) => {
  //Obtengo la salt
  const salt = await bcrypt.genSalt(10);
  //Encripto la contraseña y la retorno
  return await bcrypt.hash(password, salt);
};

//Comparo las contraseñas para saber si coincide con el hash
userSchema.statics.comparePassword = async (password, hashPassword) => {
  return await bcrypt.compare(password, hashPassword);
};

export default model("user", userSchema);
