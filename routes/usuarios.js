const {Router} = require('express');//desestructuramos una función que viene de express => Router
const { check } = require('express-validator');
//const Role = require('../models/role'); //importo el model


/* //no importo estas funciones una por una sino como un objeto, para eso creo un nuevo archivo en middlewares que los agrupe todos y luego los vuelvo a importar aquí
const {validarCampos }= require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
las importo como un objeto 👇
*/

//importo el archivo index del directorio middlewares, con cada una de sus funciones
const {
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosDelete, 
        usuariosPatch} = require('../controllers/usuarios');//de esta nabera importamos la función usuariosGet

const router = Router();//de esta manera llamamos la función
//👇 esta parte sería la ruta => router.get('/',
router.get('/', usuariosGet);//no estoy ejecutando esta función, solo enviando una referencia

//para recuperar el id de la ruta, debo poner el parámetro id
router.put('/:id', [//middlewares para validar o verificar que el id esté registrado en la BD de mongo
        check('id', 'No es un ID válido').isMongoId(),//👈 método de expressvalidator para saber si es un id de mongo.
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),//valido si el rol está en mongo
        validarCampos//👈 para no continuar a la ruta o al controlador si hay un error en los checks
], usuariosPut);

router.post('/', [//el check es un middlewares que es una función que se ejecuta antes de llamar el controlador o hacer la ejecución de las peticiones: si las validaciones pasan, se llamanrá a usuariosPost; revisamos los campos del body
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),//que el campo no venga vacío
        check('password', 'El password debe de ser más de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es válido').isEmail(),//que sea un email
        
        // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),//vamos a validar los roles contra una base de datos.
        //custom es un método que permite hacer una validación personalizada; el custom recibe como argumento el valor que estoy evaluando el rol; el dato puede ser un string vacío
        
        /*check('rol').custom( async(rol = '') => {
                const existeRol = await Role.findOne({rol})//voy a buscar uno donde el nombre del rol, sea igual al rol que estoy validando con el check; si existe, está grabado en la colección de la BD, pero si no existe
                if (!existeRol) { //si no existe lanzará la advertencia de error, que va a ser atrapado en el custom
                        throw new Error(`El rol ${rol} no está registrado en la BD`)
                }//☝ este código se puede optimizar, para eso creamos una nueva carpeta helpers, va a tener funciones que me van a ayudar a optimizar el código; validaciones contra la base de datos
        }),*/
        check('correo').custom(emailExiste),
        check('rol').custom(esRoleValido),

        validarCampos//este middleware va a revisar los errores de los checks, y si pasa se ejecuta el controlador usuariosPOst
], usuariosPost);

router.delete('/:id',[
        validarJWT,
        //esAdminRole,//este middleware forza a que tiene que ser administrador
        //si quiero poner una condición más flexible y compartida uso el siguiente
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE', 'OTRO_ROLE'),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;