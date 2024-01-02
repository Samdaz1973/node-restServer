const {Router} = require('express');//desestructuramos una función que viene de express => Router
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {login} = require('../controllers/auth');

const router = Router();//de esta manera llamamos la función
//👇 esta parte sería la ruta => router.get('/',
router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    validarCampos
],login);


module.exports = router;