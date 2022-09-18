var express = require('express');
var router = express.Router();
const Anuncios = require('../models/Anuncios')

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.locals.title = "Compra y Venta de objetos"
  try{

    //filtros

    const nombre = req.query.nombre;
    const tags = req.query.tags;

    //paginación
    const skip = req.query.skip;
    const limit = req.query.limit;
    //selección de campos
    const fields = req.query.fields;
    const sort = req.query.sort;

    //creo filtro vacio
    const filtro = {}

    if (nombre){
      filtro.nombre = nombre;
    }
    if (tags){
      filtro.tags = tags;
    }

    const anuncios = await Anuncios.lista(filtro, skip, limit, fields, sort);
      
      res.render('index', { results: anuncios});
  }catch (err){
    next(err);
  }

});

module.exports = router;
