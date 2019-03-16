const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://vamsi:vamsi@crudcluster-o0vdf.mongodb.net/Crud1?retryWrites=true', { useNewUrlParser: true },(err)=>{
//     if(!err)
//     console.log('DB conection sucess');
//     else
//     console.log('Error in DB :'+ JSON.stringify(err, undefined, 2));
// });

mongoose.connect('mongodb+srv://vamsi:vamsi@crudcluster-o0vdf.mongodb.net/CrudFinal?retryWrites=true', { useNewUrlParser: true , useFindAndModify: false },(err)=>{
    if(!err)
    console.log('DB conection sucess');
    else
    console.log('Error in DB :'+ JSON.stringify(err, undefined, 2));
});

//to run db => mongod --dbpath /data/db/ --port 27018
module.exports=mongoose;