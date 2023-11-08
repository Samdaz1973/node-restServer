const express = require('express');
const cors = require('cors');//se importa el paquete o dependencia

// Clase para administrar mi servidor
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;//hago visible el acceso al puerto
        this.usuariosPatch = '/api/usuarios';
        
        // llamo el método middlewares desde el constructor
        this.middlewares();

        // llamo el método rutas desde el constructor
        this.routes();
    }

    // creo un método Middlewares; actúa como puente para añadir otras funcionalidades al webserver; en este caso se va a ejecutar cuando lancemos, levantemos o ejecutemos el servidor

    middlewares() {//para acceder a la carpeta pública
        // use es la palabra clave para edintificar que se está usando un middlewares
        this.app.use(cors());//para proteger nuestro servidor; en ocasiones da error cuando no está habilitado

        //lectura y parseo del body; cualquier cosa información que venga la función express.json la va a pasar a json
        this.app.use(express.json());

        this.app.use(express.static('public'));//directorio o carpeta public
    }//☝ se sirve esta ruta y no la de app.get 👇 si le agrego a la ruta api y lo llamo desde el navegador localhost8080/api, me recarga el hello world

    // método para manejar las rutas
    routes() {
        // a este middleware le asigno una ruta pero también el directorio de routes
        /* this.app.use('/api/usuarios', require('../routes/user')); */
        // puedo usar el atributo usuariosPath para ponerla en la ruta
        this.app.use(this.usuariosPatch, require('../routes/usuarios'));
    }

    // método para escuchar el puerto
    listen() {

        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;