//this server file servers compressed static files
var express = require('express');
var app = express();
var compress = require('compression');

app.use(compress());

//cache control
var oneDay = 86400000;

app.use(express.static(__dirname + '/public', {maxAge: oneDay}));

app.listen(process.env.PORT || 3000);

console.log('server has started listening on port ' + 3000);
    
