const {response} = require('express');//desestructuro la función response de express

const usuariosGet = (req, res = response) => {
    //obtener lo que viene en la url postman, express lo parsea
    /* const query = req.query; */
    //desestructurando 👇
    const {q, nombre, apikey} = req.query;
    res.json({
        msg: 'get API - controlador',
        /* query */
        q,
        nombre,
        apikey
    });
}
const usuariosPost = (req, res = response) => {

    /* const body = req.body; *///para recibir lo que viene del body
    
    const {nombre, apellido, edad} = req.body;//desestructurando el body sólo pasa la información que escoja, nombre y edad, mientras que id y apellido no
    res.json({
        msg: 'post API - usuariosPost',
        /* body *///lo que sea que viene del body lo voy a reflejar en la respuesta
        nombre,
        apellido,
        edad
    });
}
const usuariosPut = (req, res = response) => {
    const id = req.params.id;//de esta manera atrapo el parametro, si vienen más parámetros se puede desestructurar al poner entre llaves {id, documento}
    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
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