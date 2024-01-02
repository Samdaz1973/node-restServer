const jwt = require('jsonwebtoken');//importo el paquete

const generarJWT = (uid = ' ') => {//recibo como argumento el uid, identificador único del usuario, que va a ser un string; sólo enviamos esta información porque no se puede enviar información sensible por seguridad
//esta función trabaja en base a promesas
    return new Promise( (resolve, reject) => {
        const payload = {uid};//aquí pongo lo que voy a grabar en el payload, verifico el id del usuario antes que nada

        //código para generar un jwt
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'//para que dure sólo 4 horas
        }, (err, token ) => {//el callback final que maneja primero el error, pero si todo sale bien el resolve enviará el token
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })
    })
}


module.exports = {
    generarJWT
}