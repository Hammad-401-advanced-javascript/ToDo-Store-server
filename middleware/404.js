'use strict';

function notFound(req,res){
    res.status(404).send('Error 404, this Page Not Found')
};

module.exports = notFound;