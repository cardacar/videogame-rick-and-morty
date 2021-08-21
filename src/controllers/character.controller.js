//Busqueda y guardado de datos de la api
import Character from "../models/character.model";
import fetch from "node-fetch";
//https://rickandmortyapi.com/api/character/?name
//Busqueda del personaje en la api
export const findCharacter = async (req, res) => {
  //Obtengo el nombre ingresado a buscar
  const { nameCharacter } = req.params;
  //Hago la peticion a la api
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${nameCharacter}`
  );
  //Obtengo la data en formato json
  const data = await response.json();
  // array que me guarda el id y el nombre del personaje y la imagen para mostrarlo
  let character = [];
  //Recorro los resultados para limpiarlos y mostrar los datos mas relevantes
  //Para la busqueda y los guardo en el array
  data.results.forEach((element) => {
    let characterSearch = {
      id: element.id,
      name: element.name,
      image: element.image,
    };
    character.push(characterSearch);
  });

  //Si solo existe 1 personaje devuelto envio el mensaje de que la busqueda fue satisfactoria
  if (character.length == 1)
    return res.json({ message: `El personaje buscado es`, character });

  //De lo contrario le mando un mensaje de que no fue correcto pero le mando los datos a los que
  //posiblemente se refiera en la busqueda
  res.json({
    message:
      "El personaje que busca no se encontro, tal vez te refieres a alguno de los siguientes",
    character,
  });
};

//Guardo el personaje
export const saveCharacter = async (req, res) => {
  //Obtengo el id del body
  const { idUser } = req.body;
  const {id} = req.params
  console.log({ id, idUser })
  if (id <= 0 || id >= 672)
    return res.json({ message: "El personaje no existe" });

  //Busco si el personaje ya se ha guardado
  const characterFound = await Character.findOne({ id_api: id });
  //Si el personaje existe mando el mensaje de que ya existe
  if (characterFound)
    return res.json({ message: "El personaje ya existe en la base de datos" });
  //Peticion de busqueda del personaje
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  const data = await response.json();
  //Creo un nuevo character
  const newCharacter = new Character({
    id_api: data.id,
    name_api: data.name,
    status_api: data.status,
    specie_api: data.specie,
    gender_api: data.gender,
    origin_api: data.origin.name,
    location_api: data.location.name,
    image_api: data.image,
    user: idUser
  });
  //Guardo el personaje en la bd con los datos mas importantes de la api
  const characterSave = await newCharacter.save();
  res.json({
    message: "El siguiente personaje se ha guardado correctamente",
    characterSave,
  });
};
//Elimino el personaje
export const deleteCharacter = async (req, res) => {
  //Obtengo el id del personaje a eliminar del body
  const { id } = req.params;
  //Busco si el id ingresado es correcto y existe en la bd
  const characterFound = await Character.findOne({ id_api: id });

  //Si el dato no existe envio el mensaje
  if (!characterFound)
    return res.json({ message: "El personaje no existe en la base de datos" });
  //De lo contrario elimino el dato de la base de datos
  await Character.findByIdAndDelete(characterFound._id);
  //Si todo es correcto envio el mensaje de eliminacion del personaje
  res.json({ message: "El dato se ha eliminado correctamente" });
};
