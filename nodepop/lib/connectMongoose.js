const mongoose = require('mongoose');

mongoose.connection.on('error', err => {
    console.log('Error de conexción', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('conectado a mongoDB en ', mongoose.connection.name);
});

mongoose.connect('mongodb://localhost/practica_node');

module.exports = mongoose.connection;