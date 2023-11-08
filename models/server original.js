const express = require('express');
const cors = require('cors');//se importa el paquete o dependencia

// Clase para administrar mi servidor
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;//hago visible el acceso al puerto
        
        // llamo el método middlewares desde el constructor
        this.middlewares();

        // llamo el método rutas desde el constructor
        this.routes();
    }

    // creo un método Middlewares; actúa como puente para añadir otras funcionalidades al webserver; en este caso se va a ejecutar cuando lancemos, levantemos o ejecutemos el servidor

    middlewares() {//para acceder a la carpeta pública
        // use es la palabra clave para edintificar que se está usando un middlewares
        this.app.use(cors());//para proteger nuestro servidor; en ocasiones da error cuando no está habilitado
        this.app.use(express.static('public'));//directorio o carpeta public
    }//☝ se sirve esta ruta y no la de app.get 👇 si le agrego a la ruta api y lo llamo desde el navegador localhost8080/api, me recarga el hello world

    // método para manejar las rutas
    routes() {
        //una petición get solicita al servidor una información o recurso que en este caso me regresa un sitio web 👇
        /* this.app.get('/api', (req, res) => { */

        //pero también puedo hacer petición que me regrese una información en un formato tipo JSON; normalmente no mandamos un string sino un objeto
        this.app.get('/api', (req, res) => {
            res.json({
                ok: true,//normalmente la petición va con el status de ok o código 200
                msg: 'get API'//el get para visualizar información
            });
        });
        //👇 esta parte sería la ruta => router.put('/',
        this.app.put('/api', (req, res) => {//apartir del callback req, se le llama controlador
            res.json({
                ok: true,
                msg: 'put API'//se usa para registros
            });
        });

        this.app.post('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'post API'//se usa para crear nuevos recursos o usuarios
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                ok: true,
                msg: 'delete API'//se usa para eliminar registros
            });
        });
    }

    // método para escuchar el puerto
    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;