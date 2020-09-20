'use strict';

const mongoose= require('mongoose');
const serverMod= require('./lib/server');

serverMod.start();
const MONGO_URL='mongodb+srv://Hammad:Hammad@1995@cluster0.hsvpu.mongodb.net/ToDo?retryWrites=true&w=majority'

const mongooseOptions={
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

  mongoose.connect(MONGO_URL,mongooseOptions)