const mongoose = require('mongoose');//llamo la conexión de mongoose, o paquete

const dbConnection = async() => {//como es una conexión a base de datos que puede fallar, es bueno hacer una validación de errores
    try {//la función connect contiene una promesa por eso puedo usar el await
        await mongoose.connect(process.env.MONGODB_CNN, {//url del .env
            useNewUrlParser: true,//grupo de objetos necesarios
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false 
        });

        console.log('Base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse a la Base de Datos');
    }
}



module.exports = {//lo envío como un objeto por si creo más conecciones, como de producicón o desarrollo.
    dbConnection
}