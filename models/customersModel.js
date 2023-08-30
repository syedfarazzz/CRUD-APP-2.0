const mongoose = require("mongoose")
const { Schema } = mongoose;

const customersSchema = new Schema({
  name: String, 
  payment: Number
});

module.exports = mongoose.model('Customer', customersSchema);