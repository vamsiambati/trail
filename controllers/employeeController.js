const express = require('express');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Employee , EmployeeImage}= require('../models/employee');

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
        salary: req.body.salary,
        imageData: req.body.imageData
    });
    emp.save((err, docs)=>{
        if(!err) {res.send(docs);}
    else console.log('Error in saving data :'+ JSON.stringify(err, undefined, 2));
    })
});

// router.put('/:id',(req, res)=>{
//     if (!ObjectId.isValid(req.params.id))
//     {
//         return res.status(400).send(`No record with given id: ${req.params.id}`);
//     }
//     else{
//         var emp ={
//             name: req.body.name,
//             position: req.body.position,
//             office: req.body.office,
//             salary: req.body.salary,
//             imageData: req.body.imageData
//           };
//           Employee.findByIdAndUpdate(req.params.id,{$set: emp}, (err,docs)=>{
//               if(!err) {res.send(docs)}
//               else{
//                 return res.status(500).send('Error in updating data :'+ JSON.stringify(err, undefined, 2));
//               }
//           });
//     }
      
   // });

router.delete('/:id',(req, res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    
    Employee.findByIdAndRemove(req.params.id,(err,docs)=>{
        if(!err) {res.send(docs)}
        else {console.log('Error in deleting data :'+ JSON.stringify(err, undefined, 2));}
    })

});

router.post('/search',(req,res)=>{
    Employee.find({ name: { '$regex': '^'+req.body.name+'[a-zA-Z]*$', '$options': 'i' } },(err,docs)=>{
        if(!err) {res.send(docs)}
       else res.status(500).send('No data:'+ JSON.stringify(err, undefined, 2))
    })
});

router.post('/updateEmp',(req,res)=>{
    var emp ={
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
        imageData: req.body.imageData
    };
    Employee.findByIdAndUpdate(req.body._id, {$set: emp},(err,docs)=>{
        if(!err) {res.send({updated:true})}
       else res.status(500).send('No data:'+ JSON.stringify(err, undefined, 2))
    })
});

router.post('/deleteEmp',(req,res)=>{
    Employee.findByIdAndRemove({_id:req.body.id},(err,docs)=>{
        if(!err) {
            var deleteImg ={
                idFromEmployee:req.id
            }
            EmployeeImage.findOneAndRemove({idFromEmployee:req.body.id},(err,docs2)=>{
                if(!err) {
                    res.send({Empdeleted:true,EmpImageDeleted:true});
                }
                else{
                    res.send({Empdeleted:true,EmpImageDeleted:false});
                }
            })          
        }  
        else {res.status(500).send('Error in deleting data :'+ JSON.stringify(err, undefined, 2));}
    })
});

router.post('/createEmp',(req,res)=>{
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
        
    });
    emp.save((err, docs1)=>{

        if(!err) {
            var empImage = new EmployeeImage({
                idFromEmployee: docs1._id,
                imageData: req.body.imageData
            });
            empImage.save((err, docs2)=>{
                if(!err) {
                    res.send({empData:true,empImageData:true});
                }
                else{
                    res.send({empData:true,empImageData:false});
                }
            })
        }
    else res.status(500).send({empData:false,empImageData:false});;
    })
});

router.post('/getFullEmp',(req,res)=>{
    Employee.findById(req.body.id,(err,empData)=>{
        if(!err) {
            var empI={
                idFromEmployee : req.body.id
            };
            EmployeeImage.find(empI, (err, docs2)=>{
                if(!err) {
                    //var empImageData= docs2[0].imageData
                    if(empData){
                    var fullEmpData={
                        _id:empData._id,
                        name: empData.name,
                        position: empData.position,
                        office: empData.office,
                        salary: empData.salary,
                        imageData: docs2[0].imageData
                    }
                    res.send(fullEmpData);
                }
                }
                else{
                    if(empData){
                    var fullEmpData={
                        _id:empData._id,
                        name: empData.name,
                        position: empData.position,
                        office: empData.office,
                        salary: empData.salary,
                        imageData: ''
                    }
                    res.send(fullEmpData)
                }
                }
            })
        }
       else res.status(500).send('No data:'+ JSON.stringify(err, undefined, 2))
    })
});

module.exports=router;