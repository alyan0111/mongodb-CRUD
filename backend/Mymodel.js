// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String
 
});

const FormModel=mongoose.model('FormModel',userSchema);
module.exports=FormModel;
