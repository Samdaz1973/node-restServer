require('dotenv').config();//para establecer variables de entorno
const Server = require('./models/server');//importo la ruta donde está el modelo o clase Server

// código para conectarme con la clase Server
const server = new Server();//llamo la clase server

// lanzo o invoco el método licen para escuchar el puerto
server.listen();