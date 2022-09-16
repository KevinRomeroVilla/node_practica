'use strict'; 

const readline = require('readline');

// conectar a la base de datos 
const connection = require('./lib/connectMongoose');

//cargar los modelos
const Anuncios = require('./models/Anuncios');

async function main() {

    const continuar = await pregunta('Estas seguro, seguro, seguro, de querer borrar toda la base de datos y cargar datos iniciales');
    if (!continuar) {
        process.exit();
    }

    //inicializar la colección de agentes
    await initAgentes();

    connection.close();

}

main().catch(err => console.log('Hubo un error:', err));

async function initAgentes (){
    //borrar todos los anuncios
    const deleted = await Anuncios.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} anuncios`);

    //crear anuncios iniciales
    const inserted = await Anuncios.insertMany([
        {nombre: 'Bicicleta', Venta: true, precio: 230.15, foto: 'bici.jpg', tags: ['lifestyle', 'motor']},
        {nombre: 'iPhone 3GS', Venta: false, precio: 50.00, foto: 'iphone.jpg', tags: ['lifestyle', 'mobile']},
        {nombre: 'Control_Play', Venta: true, precio: 100.20, foto: 'control.jpg', tags: ['mobile', 'gaming']}
    ])
    console.log(`Creados ${inserted.length} anuncios.`);
}

function pregunta (texto) {
    return new Promise((resolve, reject) => {

        const ifc = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        ifc.question(texto, respuesta => {
            ifc.close();
            if(respuesta.toLocaleLowerCase() === 'si') {
                resolve(true);
                return;
            }
            resolve(false);
        })

    })
}