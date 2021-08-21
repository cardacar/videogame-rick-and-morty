import mongoose from 'mongoose';

//Conexion a la base de datos, es una funcion asincronica ya que toca esperar
//por la respuesta
(async ()=>{
    //URI de conexion a la base de datos
    const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@videogame-rick-and-mort.lb5ya.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
    //Try catch de la conexion a la base de datos, ya que puede fallar
    try {
        //me conecto a mongodb con mongoose
        const dbConection = await mongoose.connect(MONGODB_URI, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        //Si todo es correcto y me conecta, mando mensaje por consola para saber que fue correcto
        console.log(`database is coneccted: ${dbConection.connection.name}`)
    } catch (error) {
        //Si hay un error lo muestro
        console.error(error);
    }
})();