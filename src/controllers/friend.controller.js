//Ruta para gestionar los amigos
import User from "../models/user.model";
//Como en la creacion de usuarios me aseguro que el username es unicoen
//puedo realizar busquedas por este parametro tranquilamente

export const addFriends = async (req, res) => {
  //Obtengo el id del usuario que inicio sesion
  const { idUser } = req.body;
  const { username } = req.params;
  //Obtengo el id del usuario que desea agregar a la lista de amigos
  //Como en el middleware se que el usuario existe no tengo que buscarlo
  const userFound = await User.findById({ _id: idUser });
  //Busco el usuario que desea agregar a la lista de amigos
  const userAddFound = await User.findOne({ username: username });
  //Si no existe el usuario a agregar envio el mensaje de que el usuario no existe
  if (!userAddFound)
    return res.json({ message: "El usuario que desea agregar no existe" });

  //Inicializo un array con los amigos que ya estan en la lista
  //Si el amigo ya se incluye en la lista devuelvo un mensaje
  const friends = await userFound.addedFriends;
  if (friends.includes(userAddFound._id)) {
    res.json({ message: "El usuario ya se encuentra en su lista de amigos" });
  } else {
    //Actualizo la lista de amigos con el id del usuario correspondiente
    const userFriendUpdate = await User.findByIdAndUpdate(
      idUser,
      { addedFriends: [...userFound.addedFriends, userAddFound._id] },
      {
        new: true,
      }
    );
    //Si todo es correcto envio un mensaje con los datos actualizados
    res.json({
      message:
        "El usuario se ha agregado correctamente a tu lista de amigos, y ahora tu lista de amigos queda de la siguiente forma",
      friends: userFriendUpdate.addedFriends,
    });
  }
};

//Eliminar usuario de la lista de amigos
export const deleteFriend = async (req, res) => {
  //Obtengo el id del usuario para buscar su lista de amigos
  const { idUser } = req.body;
  //Obtengo el id del usuario que desea eliminar
  const { username } = req.params;

  //Obtengo el id del usuario que desea agregar a la lista de amigos
  //Como en el middleware se que el usuario existe no tengo que buscarlo
  const userFound = await User.findById({ _id: idUser });
  //Busco el usuario que desea agregar a la lista de amigos
  const userDeleteFriend = await User.findOne({ username: username });
  if (!userDeleteFriend)
    return res.json({ message: "El usuario que desea eliminar no existe" });
    //Obtengo el id del usuario a eliminar
  const userDeleteFriendId = userDeleteFriend._id;
  //Inicializo un array con los amigos que ya estan en la lista
  const friends = userFound.addedFriends;

  if (friends.includes(userDeleteFriend._id)) {
      //Busco la posicion del amigo que se desea eliminar
    const positionArrayDeleteFriend = friends.indexOf(userDeleteFriendId)
    //Realizo un splice al array de amigos para eliminar el id de la lista
    friends.splice(positionArrayDeleteFriend, 1)
        //Actualizo los datos del usuario
      const userFriendUpdate = await User.findByIdAndUpdate(
          idUser,
          {
            addedFriends: [
              ...friends,
            ],
          },
          {
            new: true,
          }
        );
        //Envio el mensaje al usuario
        res.json({
          message:
            "Se ha eliminado de la lista de amigos, su nueva lista de amigos queda asi",
          friends: userFriendUpdate.addedFriends,
        });
    
  } else {
      //Si el usuario intenta eliminar un amigo que no esta en su lista de amigos se la envio
    res.json({
        message:
          "El usuario que desea eliminar no se encuentra en su lista de amigos, su lista de amigos es",
          friends: userFound.addedFriends,
      });
  }
};
