import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import pkg from '../package.json'

//Inicializo la variable app con express
const app = express();
//Declaro la variable port, si existe un PORT se asigna de lo contrario lo asigno con el puerto 3000
app.set('port', process.env.PORT || 3000)

//Obtengo las variables de entorno del archivo .env
dotenv.config({path: './.env'})

//Asigno la variable pkg para obtener los datos del packaje json
app.set('pkg', pkg);


//Middleware a usar
app.use(morgan('dev'));//
app.use(express.json());


//Ruta inicial de la API donde muestro datos iniciales
app.get('/', (req, res)=>{
    res.json({message: 'Welcome'})
        
});

export default app