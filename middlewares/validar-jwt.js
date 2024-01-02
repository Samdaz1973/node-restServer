const { response, request } = require('express');
const jwt = require('jsonwebtoken');//importo el paquete

const Usuario = require('../models/usuario');//importo el usuario del model para recuperar el usuario autenticado

//dentro de los headers vienen los tokens, para leer debo leer la reuest
const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');//nombre del token en el fronted

    if ( !token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        //para extraer el uid
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        //leer el usaurio autenticado con el uid
        //req.usuario = await Usuario.findById(uid);//se puede hacer en una sola línea, pero por fines educativos lo hacemos en dos
        const usuario = await Usuario.findById(uid);
        //req.uid = uid;//lo ponemos en la request
        
        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            })
        }

        //verificar si el uid tiene estado true,para que no aparezca como logueado cuando ha sido eliminado
        if( !usuario.estado) {//si el estado es false, es decir no existe como true, va a retornar
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado: false'
            })
        }
        req.usuario = usuario;
        next();//para que continue con lo que sigue

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}

module.exports = {
    validarJWT
}