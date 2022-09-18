const express = require('express');
const router = express.Router();
const {query, validationResult } = require('express-validator');
const Anuncios = require('../../models/Anuncios')

// GET//api/agentes
// devuelve una lista de agentes

router.get('/', async (req,res, next) => {
    try{
  
      //filtros
  
      const nombre = req.query.nombre;
      const tags = req.query.tags;
      const venta = req.query.venta;
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

      if (venta){
        filtro.venta = venta;
      }
  
      const anuncios = await Anuncios.lista(filtro, skip, limit, fields, sort);
        
        res.json({ results:anuncios});
    }catch (err){
      next(err);
    }
  
  });
  
  router.get('/en_query_string', [//validaciones 
    query('orderby').isAlphanumeric().withMessage('must be alphanumeric'),
    query('solo').isNumeric().withMessage('must be numeric'),
  ], (req, res, next)=> {
    validationResult(req).throw();
    console.log(req.query);
    const orderBy = req.query.orderby;
    const numero = req.query.solo;
    res.json({ result: true});
  });
  
  // GET/api/anuncios/(_id)
  // devuelve 1 anuncio
  
  router.get('/:_id', async (req, res, next) => {
    try {
  
      const _id = req.params._id;
  
      const anuncio = await Anuncios.findOne( {_id: _id});
  
      res.json({ result: anuncio });
      
    } catch (error) {
      next(error);
    }
  });
  
  // PUT/api/anuncios/(_id)  (body)
  //actualizar un anuncio
  router.put('/:id', async (req, res, next) => {
    try {
  
      const _id= req.params.id;
      const data = req.body;
  
      const anuncioActualizado = await Anuncios.findOneAndUpdate({_id: _id}, data, { 
        new: true }); // esto hace que nos devuelva el documento actualizado
  
      res.json({ result: anuncioActualizado });
  
      
    } catch (error) {
      next(error);
    }
  });
  
  // POST/api/anuncios (body)
  //crean un anuncio
  router.post('/', async (req, res, next) => {
    try {
      const anuncioData = req.body;
      
      //instanciamos objeto en memoria
      const anuncio = new Anuncios(anuncioData); 
  
      console.log(`El nombre del objeto es ${anuncio.nombre}`)
  
      //lo guardamos en la base de datos
      const anuncioGuardado = await anuncio.save();
  
      res.json({ result: anuncioGuardado });
  
  
    }catch (error) {
      next(error);
    }
  })
  
  // DELETE/api/anuncios/:_id
  //Eliminar un anuncio
  
  router.delete('/:id', async (req, res, next) => {
    try {
      const _id = req.params.id;
  
      await Anuncios.deleteOne({ _id: _id});
  
      res.json();
      
    }catch (error) {
      next(error)
    }
  })




module.exports=router