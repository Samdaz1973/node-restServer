const Role = require('../models/role');//importo el model
const Usuario = require('../models/usuario');//importo el model

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol})//voy a buscar uno donde el nombre del rol, sea igual al rol que estoy validando con el check; si existe, está grabado en la colección de la BD, pero si no existe
    if (!existeRol) { //si no existe lanzará la advertencia de error, que va a ser atrapado en el custom
            throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {
    // verificar si el correo ya existe; findOne, busca uno
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya existe`);
    }
}
const existeUsuarioPorId = async(id) => {
    // verificar si el id ya existe; findOne, busca uno
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe: ${id}`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}