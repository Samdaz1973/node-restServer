const {Schema, model} = require('mongoose');

// Diferencia entre BD relacionales y no relacionales
/* 
relacionales: utiliza estructura tabular con filas y columnas para almacenar y organizar los datos, que se almacenan en tablas y se establecen relaciones entre ellas mediante claves primarias y externas; rígidas y escalables verticalmeente

NO relacionales o no sicual sq; estructura flexible no requiere esquema fijo; diferentes modelos de datos como ducumentos json, grafos y clave de valor; son más rápidas y flexibles, escalables horizontalmente
*/

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    },
});

//método para borrar la contraseña del documento JSON; para hacerlo global, llamamos el UsuarioSchema de mongoose; debe ser una función normal porque vamos a usar el objeto this, no puede ser una función flecha, porque mantiene afuera a lo que apunta el this.
UsuarioSchema.methods.toJSON = function() {//estamos sobreescribiendo el documento JSON que se guarda en la base de datos
    //desestructuramos lo que viene del this.toObject; me va a generar mi instancia pero con sus valores respectivos, como si fuera un objeto de javaScript; voy a sacar del documento JSON dos datos la versión y el password; estoy sacando estos tres y todos los demás se van a guardar en usuario
    const {__v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;//convierto el _id en uid visualmente en postman
    return usuario;

}

// se exporta un modelo, le pongo un nombre a la colección 'Usuario', y por último el Schema que es UsuarioSchema
module.exports = model('Usuario', UsuarioSchema);