'use strict';

const Model = require('../model');
const productsSchema = require('./product-schema');

class Products extends Mode{
    constructor(){
        super(productsSchema);
    }
}

module.exports = new Products();