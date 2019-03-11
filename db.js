const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27018/CrudDB', { useNewUrlParser: true },(err)=>{
    if(!err)
    console.log('DB conection sucess');
    else
    console.log('Error in DB :'+ JSON.stringify(err, undefined, 2));
});
//to run db => mongod --dbpath /data/db/ --port 27018
module.exports=mongoose;