const {Schema, model} = require('mongoose');//recuperamos el schema y el modelo de mogoose.

//nos creamos nuestro esquema
const RoleSchema = Schema({
    rol: {
        type: String,
        require: [true, 'El rol es obligatorio']
        //el require es por si alguien lo va a insertar desde un formulario por ejemplo
    }
});

//lo exporto
module.exports = model('Role', RoleSchema);

