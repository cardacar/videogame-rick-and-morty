import express from "express";
/* import morgan from "morgan"; */
import dotenv from "dotenv";
/* import pkg from "../package.json"; */
import characterRoute from "./routes/character.routes";
import sigInRoute from './routes/auth.routes'
import registerRoute from './routes/register.routes'
import userRoute from './routes/user.routes'
import friendRoute from './routes/friend.routes'

//Inicializo la variable app con express
const app = express();
//Declaro la variable port, si existe un PORT se asigna de lo contrario lo asigno con el puerto 3000
app.set("port", process.env.PORT || 3000);

//Obtengo las variables de entorno del archivo .env
dotenv.config();

//Asigno la variable pkg para obtener los datos del packaje json
/* app.set("pkg", pkg); */

//Middleware a usar
/* app.use(morgan("dev")); // */
app.use(express.json());

//Ruta inicial de la API donde muestro datos iniciales
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

//rav-> rick and morty videogame

//Defino las rutas de la api
app.use('/api-rav/character',characterRoute );
app.use('/api-rav/register', registerRoute);
app.use('/api-rav/logIn', sigInRoute);
app.use('/api-rav/friend', friendRoute);
app.use('/api-rav/user', userRoute);

export default app;
