//Importo la app
import app from './app';
//Importo la conexon a la base de datos
import './database/db'
//Servidor en el puerto de escucha
app.listen(app.get('port'), ()=>{
    console.log(`app on port: ${app.get('port')}`)
})