const { response } = require("express")


const esAdminRole = (req, res = response, next) => {

    if (!req.usuario) {//si el usuario no existe es porque no se ha hecho bien la petición, no se ha validado primero el token
        return res.status(500).json({//el 500 es información para el backen para decirle que hizo mal un procedimiento
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }

    const {rol, nombre} = req.usuario;//recuperamos de la request el role y el nombre
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador - No tiene autorización para este procedimiento`
        });
    }
    next();//si es igual, entonces se deja pasar
}

const tieneRole = (...roles) => {//todo lo que la persona envíe va a quedar almacenada en roles como un arreglo
    //ahora tengo que retornar una función que se dispara cuando el código pase por la función tieneRole

    //Esta función se va a ejcutar en la ruta de usuarios en tieneRole
    return(req, res = response, next) => {
        //console.log(roles, req.usuario.rol);//para mostrar en consola gitbash la lista de roles, y para mostrar el rol de la persona logueada
    
    //Hago primero la vilidación del token
    if (!req.usuario) {//si el usuario no existe es porque no se ha hecho bien la petición, no se ha validado primero el token
        return res.status(500).json({//el 500 es información para el backen para decirle que hizo mal un procedimiento
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }

    if (!roles.includes(req.usuario.rol)) {//si el rol del usuario no incluye uno de los guardado en la variable roles no se puede ejecutar el procedimiento
        return res.status(401).json({
            msg: `El servicio requiere uno de estos roles ${roles}`
        });
    }

        next();//si cumple la condición se ejecuta la ruta
    }

}


module.exports = {
    esAdminRole,
    tieneRole
}