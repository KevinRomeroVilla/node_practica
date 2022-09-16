const mongoose = require('mongoose');

// definimos el esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta:Boolean,
    precio:Number,
    foto: String,
    tags: [String]
});


anuncioSchema.statics.lista= function(filtro, skip, limit,fields, sort) {
    const query = Anuncios.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}

// Creamos el modelo
const Anuncios = mongoose.model('Anuncio', anuncioSchema);

// Exportamos el modelo
module.exports = Anuncios;