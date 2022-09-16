var express = require('express');
const { Result } = require('express-validator');
var router = express.Router();
const Anuncios = require('../models/Anuncios')

/* GET home page. */
router.get('/', async function(req, res, next) {

  res.locals.title = "Anuncios"
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

    //ejemplos de peticiones 
    //http://localhost:3000/api/agentes/?skip=2&limit=2&fields=name%20-_id
    //http://localhost:3000/api/agentes/?sort=age

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
  //const anuncios = await Anuncios.find()
  //res.render('index',{ results: anuncios}) 

});

module.exports = router;
