
const { validationResult } = require('express-validator');


// El tercer argumento me dice que si no cayó en el error continúe con el siguiente middlewares; cuando no hay más, se ejcuta el controlador.
const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}


module.exports = {
    validarCampos

}