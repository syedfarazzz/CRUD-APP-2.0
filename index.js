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
    // const customers = await Customer.findByIdAndUpdate(req.params.id, req.body, {new:true});
    // const customers = await Customer.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, upsert: true});

    // Use Replace if want to replace the whole doc with whatever payload in the req.body, else if just want to change
    // selected fields use the above two
    // const customers = await Customer.findOneAndReplace({_id:req.params.id}, req.body, {new:true});
    
    const customers = await Customer.replaceOne({name:'Qamar'}, req.body, {new:true});
    res.status(200).json(customers);
}

async function deleteCustomer(req, res) 
{
  // no difference b/w delete and remove
    const customers = await Customer.findByIdAndDelete(req.params.id);
    // // const customers = await Customer.findByIdAndRemove(req.params.id);
    res.status(200).json(customers);

}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

/* ******************************************************************************************* */
// CREATE
// Model.create()
// const customers = await Customer.create(req.body);
// const customers = await Customer.create([req.body, {name:"Hamza"}]);

/* ******************************************************************************************* */
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

/* ******************************************************************************************* */
// UPDATE

// updateOne Vs findOneAndUpdate, both are same except their response/returns are different
// One returns stats while other returns the affected document

// Model.findByIdAndUpdate()
// const customers = await Customer.findByIdAndUpdate(req.params.id, req.body, {new:true});     //first param: id, 2nd param: data, 3rd param: options
// A.findByIdAndUpdate(id, update, options)  // returns Query
// A.findByIdAndUpdate(id, update)           // returns Query
// A.findByIdAndUpdate()                     // returns Query

// Model.findByIdAndUpdate(id, { name: 'jason bourne' }, options)

// is sent as
// Model.findByIdAndUpdate(id, { $set: { name: 'jason bourne' }}, options)

// Model.findOneAndUpdate()
// A.findOneAndUpdate(conditions, update, options)  // returns Query
// A.findOneAndUpdate(conditions, update)           // returns Query
// A.findOneAndUpdate()                             // returns Query

// const query = { name: 'borne' };
// Model.findOneAndUpdate(query, { name: 'jason bourne' }, options)

// // is sent as
// Model.findOneAndUpdate(query, { $set: { name: 'jason bourne' }}, options)


// Model.updateMany()
// Same as updateOne(), except MongoDB will update all documents that match filter (as opposed to just the first one) 
// regardless of the value of the multi option.

// const res = await Person.updateMany({ name: /Stark$/ }, { isQuestion: true });    //isQuestion is the payload to be updated to true 
// res.matchedCount; // Number of documents matched
// res.modifiedCount; // Number of documents modified
// res.acknowledged; // Boolean indicating everything went smoothly.
// res.upsertedId; // null or an id containing a document that had to be upserted.
// res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.

// Model.updateOne()
// Update only the first document that matches filter.
// Use replaceOne() if you want to overwrite an entire document rather than using atomic operators like $set.

// const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });   2nd param is to be updated payload
// res.matchedCount; // Number of documents matched
// res.modifiedCount; // Number of documents modified
// res.acknowledged; // Boolean indicating everything went smoothly.
// res.upsertedId; // null or an id containing a document that had to be upserted.
// res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.

/* ******************************************************************************************* */
// REPLACE (Overwrite whole)

// Use Replace if want to replace the whole doc with whatever payload in the req.body, else if just want to change
// selected fields use the Update methods.

// replaceOne Vs findOneAndReplace, both are same except their response/returns are different
// One returns stats while other returns the affected document

// Model.replaceOne()
// Replace the existing document with the given document (no atomic operators like $set).
// const res = await Person.replaceOne({ _id: 24601 }, { name: 'Jean Valjean' });
// res.matchedCount; // Number of documents matched
// res.modifiedCount; // Number of documents modified
// res.acknowledged; // Boolean indicating everything went smoothly.
// res.upsertedId; // null or an id containing a document that had to be upserted.
// res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.

// Model.findOneAndReplace()
// Finds a matching document, replaces it with the provided doc, and returns the document.
// A.findOneAndReplace(filter, replacement, options)  // return Query
// A.findOneAndReplace(filter, replacement)           // returns Query
// A.findOneAndReplace()                              // returns Query

/* ******************************************************************************************* */
// DELETE

// deleteeOne Vs findOneAndDelete, both are same except their response/returns are different
// One returns stats while other returns the affected document

// Model.deleteMany()
// Deletes all of the documents that match conditions from the collection. It returns an object with the property deletedCount containing 
// the number of documents deleted. Behaves like remove(), but deletes all documents that match conditions regardless of the single option.
// await Character.deleteMany({ name: /Stark/, age: { $gte: 18 } })   // returns {deletedCount: x} where x is the number of documents deleted.

// Model.deleteOne()
// Removes this document from the db. Equivalent to .remove().  Resturns Promise
// product = await product.deleteOne();
// await Product.findById(product._id); // null

// Model.findByIdAndDelete()
// const customers = await Customer.findByIdAndDelete(req.params.id);

// Model.findOneAndDelete()
// A.findOneAndDelete(conditions, options)  // return Query
// A.findOneAndDelete(conditions) // returns Query
// A.findOneAndDelete()           // returns Query

/* ******************************************************************************************* */
// REMOVE

// Remove Vs Delete, Both are same only names are different for clarity purpose

// Model.findByIdAndRemove()
// Finds a matching document w.r.t id, removes it, and returns the found document (if any).
// A.findByIdAndRemove(id, options)   // return Query
// A.findByIdAndRemove(id)            // returns Query
// A.findByIdAndRemove()           // returns Query

// Model.findOneAndRemove()
// Finds a matching document, removes it, and returns the found document (if any).
// A.findOneAndRemove(conditions, options)  // return Query
// A.findOneAndRemove(conditions) // returns Query
// A.findOneAndRemove()           // returns Query