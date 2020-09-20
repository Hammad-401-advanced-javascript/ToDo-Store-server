'use strict';

const { model } = require("mongoose");

function getModel(req,res,next){
    let model = req.params.model;
    if(model === 'product' || model==='category'){
        req.model = require(`../lib/models/${model}/${model}.collection}`);
        next();
        return;
    }
    else{
        next('Error inValid Model')
        return;
       
    }
}

model.exports = getModel;