'use strict';

const mongoose = require('mongoose');

const todo = mongoose.Schema({
    item:{ type:String, required:true},
    assignee:{type:String, required: true},
    difficulty:{type:String,required:true},
    complete:{type:Boolean,required:true},
});

module.exports = mongoose.model('todo',todo);