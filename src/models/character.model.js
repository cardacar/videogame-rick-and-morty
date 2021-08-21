import { Schema, model } from "mongoose";

//Creacion del modelo de personaje
const characterSchema = new Schema(
  {
    id_api: { type: String, require: true },
    name_api: { type: String, require: true },
    status_api: { type: String, require: true },
    specie_api: { type: String, require: true },
    gender_api: { type: String, require: true },
    origin_api: { type: String, require: true },
    location_api: { type: String, require: true },
    image_api: { type: String, require: true },
    user:[{
      ref:'user',
      type: Schema.Types.ObjectId,
    }]
  },
  {
    //timestamps en true para tener los datos de los tiempos del CRUD
    timestamps: true,
    versionKey: false,
  }
);

export default model("character", characterSchema);
