const express = require('express')
const Customer = require("./models/customersModel")
const dotenv = require("dotenv").config();

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');

  const connect = await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("Database Connected: ", connect.connection.name);
}


const app = express()
const port = 3000

app.use(express.json());

//Create
app.post('/api/customers', createCustomer);

//Read
app.get('/api/customers', getCustomers);

//Update
app.put('/api/customers/:id', updateCustomer);

//Delete
app.delete('/api/customers/:id', deleteCustomer);

//Read by Id
app.get('/api/customers/:id', getCustomer);

async function getCustomer(req, res){
  const customer = await Customer.findById(req.params.id);
  res.status(200).json(customer);
}

async function createCustomer(req, res) 
{
    const customers = await Customer.create(req.body);
    res.status(201).json(customers);
}

async function getCustomers(req, res) 
{
    const customers = await Customer.find();
    res.status(200).json(customers);
}

async function updateCustomer(req, res) 
{
    const customers = await Customer.findByIdAndUpdate(req.params.id, req.body, {new:true});
    // const customers = await Customer.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, upsert: true});
    res.status(200).json(customers);
}

async function deleteCustomer(req, res) 
{
    const customers = await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json(customers);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/* ********************************************************************** */
// CREATE
// Model.create()
// const customers = await Customer.create(req.body);
// const customers = await Customer.create([req.body, {name:"Hamza"}]);

/* ********************************************************************** */
// READ
// Model.find()
// const customers = await Customer.find();

// find all documents named john and at least 18
// await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

// executes, name LIKE john and only selecting the "name" and "friends" fields
// const customers = await Customer.find({name: /ham/i}, 'name payments');

// Model.findById()
// const customer = await Customer.findById(req.params.id);

// select only the adventures name and length
// await Adventure.findById(id, 'name length').exec();

// If you're querying by _id, use findById() instead.
// Model.findOne()
// Select only the adventures name and length
// await Adventure.findOne({ country: 'Croatia' }, 'name length').exec();

/* ********************************************************************** */
// UPDATE
// Model.findByIdAndUpdate()
// Model.findOneAndUpdate()
// Model.updateMany()
// Model.updateOne()

/* ********************************************************************** */
// DELETE
// Model.deleteMany()
// Model.deleteOne()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findOneAndDelete()
// Model.findOneAndRemove()


// Model.findOneAndReplace()
// Model.replaceOne()

