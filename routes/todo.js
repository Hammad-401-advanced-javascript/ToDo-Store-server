'use strict';

const express = require('express');
const route = express.Router();
const productsCrud = require('../lib/models/products.js/products.collection');

route.post('/todo',postProduct);
function postProduct(req, res,next){
  let data = req.body;
  productsCrud.create(data)
    .then(productAdded=>{
      res.json(productAdded);
    })
    .catch(next);
}
//find All tasks (GET)
route.get('/todo',getAllProducts);
function getAllProducts(req, res,next){
  productsCrud.get()
    .then(allProducts =>{
      res.json(allProducts);
    })
    .catch(next);
}
//find task By Id (GET)
route.get('/todo/:id',getByIdProduct);
function getByIdProduct(req, res,next){
  let id = req.params.id;
  productsCrud.get(id)
    .then(productId =>{
      res.json(productId);
    })
    .catch(next);
}
//update specific task By Id (PUT)
route.put('/todo/:id',updatedProductById);
function updatedProductById(req, res,next){
  let id = req.params.id;
  let data = req.body;
  productsCrud.update(id,data)
    .then(updatedProduct =>{
      res.json(updatedProduct);
    })
    .catch(next);
}
// delete specific task By Id (DELETE)
route.delete('/todo/:id',deleteProduct);
function deleteProduct(req, res,next){
  let id = req.params.id;
  productsCrud.delete(id)
    .then(result =>{
      res.json({delete:`you delete the category has Id: ${id}`});
    })
    .catch(next);
}
  
module.exports = route;