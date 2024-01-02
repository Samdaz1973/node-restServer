const {response} = require('express');
const bcryptjs = require('bcryptjs');//para validar la contraseña importo
const Usuario = require('../models/usuario');//para verificar el usuario tenemos que importar el modelo usuario
const { generarJWT } = require('../helpers/generar-jwt');//se importa el helpers

const login = async(req, res = response) => {

    const {correo, password} = req.body;//extraigo de al reques.body el correo y el password

    try {//uso el try y catch por si algo sale mal

        //verificar que el correo exista
        const usuario = await Usuario.findOne({correo});//que busque uno que es el correo
        if (!usuario) {//si no existe
            return res.status(400).json({//el return hay que ponerlo, si no sigue ejecuntado el código.
                msg: 'Usuario / Password no son correctos - email'
            })
        }

        //Verificar si el usuario está activo
        if (!usuario.estado) {//si no , o está en false
            return res.status(400).json({//el return hay que ponerlo, si no sigue ejecuntado el código.
                msg: 'Usuario / usuario no está activo en BD - estado: false'
            })
        }
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);//el método compara el password digitado con el password que está en la BD
        if (!validPassword) {//si el password no es válido
            return res.status(400).json({//el return hay que ponerlo, si no sigue ejecuntado el código.
                msg: 'Usuario / Password no son correctos -password'
            })
        }
        //Generar el JWT -> json web token
        const token = await generarJWT(usuario.id );

        res.json({//sólo se puede tener un res.json por flujo del controlador
            usuario,//se regresa el usuario que se acaba de autenticar 
            token//se envía el token
        })

    } catch (error) {//el catch es para que la aplicación no se caiga
        console.log(error)
        res.status(500).json({//el status 500 es un internal server error para verlo internamente
            msg: 'Hable con el administrador'//este mensaje es para el usuario
        });
    }


}



module.exports = {
    login
}