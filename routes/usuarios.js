const {Router} = require('express');//desestructuramos una función que viene de express => Router

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch} = require('../controllers/usuarios');//de esta nabera importamos la función usuariosGet

const router = Router();//de esta manera llamamos la función
//👇 esta parte sería la ruta => router.get('/',
router.get('/', usuariosGet);//no estoy ejecutando esta función, solo enviando una referencia

//para recuperar el id de la ruta, debo poner el parámetro id
router.put('/:id', usuariosPut);

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;