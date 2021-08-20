import { Schema, model } from "mongoose";

//Creacion del modelo de la lista de amigos
const friendSchema = new Schema(
  {
    addedFriend: [
      {
        ref: "user",
        type: Schema.Types.ObjectId,
      },
    ],
    requestFriend: [
      {
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

export default model("friend", friendSchema);
