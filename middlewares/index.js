


const validarCampos= require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');


module.exports = {
    ...validarCampos,//con el operador express (...) reune todo lo que contenga el archivo
    ...validarJWT,
    ...validaRoles
}

