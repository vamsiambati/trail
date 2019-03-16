const mongoose = require('mongoose');

var Employee = mongoose.model('Employee',{
    name: {type: String},
    position:{type: String},
    office:{type: String},
    salary:{type:Number},
});

var EmployeeImage = mongoose.model('EmployeeImage',{
    idFromEmployee: {type: String},
    imageData:{type:String}
});

module.exports = {Employee, EmployeeImage};