const {response} = require('express');//desestructuro la función response de express
const bcryptjs = require('bcryptjs');//paquete para encriptar la contraseña


// importo el modelo de Usuario
const Usuario = require('../models/usuario');

const usuariosGet = async(req, res = response) => {

    //obtener lo que viene en la url postman, express lo parsea
    /* const query = req.query; */
    //desestructurando 👇
    //const {q, nombre, apikey, page = 1, limit } = req.query;

    //Código para listar en el Get la lista de usuarios

    const { limite = 5, desde = 0} = req.query;//desestructuro para recuperar del request que viene del query, extraigo el límite y le pongo una cantidad
    const query = { estado: true};//para eliminar de la lista los registros inactivos o que estén en false

    /*const usuarios = await Usuario.find(query)
        .skip(Number(desde))//este método me permite introducir un punto desde donde quiero recuperar la lista, significa salto
        .limit(Number(limite));//envío en el método la constante límite que desestructuré, pero para que funcione un postman debo cambiar el string a número

    //consulta para saber cuántos registros tengo
    const total = await Usuario.countDocuments(query);*/

    //Código para que la respuesta sea más rápida y eficiente, incluyo las dos promesas en una misma consulta, desestructuro los valores que quiero recuperar en el orden que quiero que aparezcan
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
        //msg: 'get API - controlador',
        /* query */
        /* q,
        nombre,
        apikey*/
    });
}
// Debo convertirlo en un función asíncrona
const usuariosPost = async (req, res = response) => {

    //Para no volver a pegar esto en cada uno de los controladores creamos una carpeta middlewares para poner ahí este código dentro de una función para no repetirlo 👇
    /* const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }*/

    /* const body = req.body; *///para recibir lo que viene del body

    // desestructuramos el body, especificar los datos que me interesa grabar en la BD
    const {nombre, correo, password, rol} = req.body
    
    //creamos este usuario con todo lo que venga en el body
    /* const usuario = new Usuario(body) */;//este código permite crear un nuevo usuario cada vez que se llame, se le dice instanciar

    // Creamos el nuevo usuario desestructurado
    const usuario = new Usuario({nombre, correo, password, rol});

        // Encriptar la contraseña el salt es el número de vueltas que dará para desencriptar y lo hace más complicado, por defecto está en 10
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);


    // Para grabar el registro en BD de mongo
    await usuario.save();

    /* const {nombre, apellido, edad} = req.body; */
    //desestructurando el body sólo pasa la información que escoja, nombre y edad, mientras que id y apellido no
    res.json({
        /*msg: 'post API - usuariosPost',
         body *///lo que sea que viene del body lo voy a reflejar en la respuesta
        usuario//se recibe la respuesta del usuario
    });
}
const usuariosPut = async(req, res = response) => {
    const id = req.params.id;//de esta manera atrapo el parametro, si vienen más parámetros se puede desestructurar al poner entre llaves {id, documento}
    //desestructuro información que viene en la request.body; extraigo el password y el google, las demás propiedades van a venir en el resto
    const {_id, password, google, correo, ...resto } = req.body;

    //validar si el password existe, porque desea actualizar su contraseña:
    if (password) { //vuelvo a realizar el jas o el código para encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    //ahora actualizo este registro ☝ lo busco por el id y lo actualizo la información que venga en el resto.
    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json(usuario);
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}
const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;

    //Para borrar un registro físicamente de la BD 👇
    //const usuario = await Usuario.findByIdAndDelete(id)

    //para borrar usando el cambio de estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    //const usuarioAutenticado = req.usuario;//recupero al usuario autenticado de la request.; una vez hechas las autenticaciones en el validar-jwt no es necesario recuperar esta información
    res.json({//envío los datos recuperados al documento json
        usuario,
        //usuarioAutenticado//lo comento porque la eliminación sólo debería mostrarme cuál fue el usuario modificado o eliminado con el estado en false
        //msg: 'delete API - usuariosDelete'
        //id no retorno el id sino el usuario que ha sido borrado
    });
}

// Como voy a exportar muchos controladores  envío la función usuariosGet dentro de un objeto
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}