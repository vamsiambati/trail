const express = require('express');
const bodyParser = require('body-parser');
const cors  = require('cors');

const{mongoose}= require('./db.js');
var employeeClontroller =require('./controllers/employeeController.js')

var app= express();
app.use(bodyParser.json());
app.use(cors()); 

app.listen(process.env.PORT || 3000, () => console.log('server started at port' + process.env.PORT));

app.use('/employees', employeeClontroller)
