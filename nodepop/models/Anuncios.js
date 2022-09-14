const mongoose = require('mongoose');

// definimos el esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta:Boolean,
    precio:Number,
    foto: String,
    tags: [String]
});

// Creamos el modelo
const Anuncios = mongoose.model('Anuncio', anuncioSchema);

// Exportamos el modelo
module.exports = Anuncios;