const express = require('express');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Employee}= require('../models/employee');

router.get('/', (req, res)=>{
    Employee.find((err, docs)=>{
        if(!err) {res.send(docs);}
    else console.log('Error in retriving data :'+ JSON.stringify(err, undefined, 2)); 
    });
});

router.get('/:id', (req, res)=>{
if (!ObjectId.isValid(req.params.id))
return res.status(400).send(`No record with given id: ${req.params.id}`);
else
Employee.findById(req.params.id,(err, docs)=>{
if(!err) {res.send(docs)}
else console.log('Error in retriving data :'+ JSON.stringify(err, undefined, 2))
});
});

router.post('/', (req, res)=>{
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
    });
    emp.save((err, docs)=>{
        if(!err) {res.send(docs);}
    else console.log('Error in saving data :'+ JSON.stringify(err, undefined, 2));
    })
});

router.put('/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    
      var emp ={
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary
      };
      Employee.findByIdAndUpdate(req.params.id,{$set: emp}, {new:true}, (err,docs)=>{
          if(!err) {res.send(docs)}
          else{
            return res.status(500).send('Error in updating data :'+ JSON.stringify(err, undefined, 2));
          }
      });
    });

router.delete('/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    Employee.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err) {res.send(docs)}
        else {console.log('Error in deleting data :'+ JSON.stringify(err, undefined, 2));}
    })

});

router.post('/search',(req,res)=>{
    Employee.find(req.body,(err,docs)=>{
        if(!err) {res.send(docs)}
       else res.status(500).send('No data:'+ JSON.stringify(err, undefined, 2))
    })
});

module.exports=router;