const express = require("express");
const app = express();
const client = require("./db.js");
const db = client.db();
const mongodb = require('mongodb');

// You should actually store your JWT secret in your .env file - but to keep this example as simple as possible...
const jwt = require("jsonwebtoken");
const jwtsecret = "the most secret string of text in history";

app.use(express.json());
app.use(express.static("public"));

// ==============================================

const pets = client.db("JoshTestDB").collection("pets");
const users_db = client.db("JoshTestDB").collection("users");

// ==============================================
// CRUD Read
app.get("/read", async (req, res) => {
  try {
    const dogs = await db.collection("pets").find({ species: "dog" }).toArray();
    if (dogs.length) {
      res.json(dogs);
    } else {
      res.json("You do not currently have any dogs in your pets collection.");
    }
  } catch (err) {
    console.log(err);
    res.json("Try again later.");
  }
});

// ==============================================
// CRUD Create
app.get("/create", async (req, res) => {
  try {
    const result = await pets.insertOne({name: 'alen', species: 'dog', age: 7});
    console.log('Added new animal');
  
    res.json(result)
  } catch(e) { 
    console.log('Adding animal failed! Error: ', e);
    res.json("Adding animal failed!");
  } 
});

// ==============================================

// CRUD Update
app.get("/update/:id", async (req, res) => {

  const ID = String(req.params.id);

  try {
    const result = await pets.updateOne({_id: mongodb.ObjectID(ID)}, {$set: {name: 'UPDATED-josh'}});
    console.log('Updated animal');
    res.json(result);
  } catch(e) { 
    console.log('Updating animal failed! Error: ', e);
    res.json("Updating animal failed!");
  } 
});

// ==============================================

// CRUD Delete
app.get("/delete/:id", async (req, res) => {

  const ID = String(req.params.id);
  console.log('id: ', ID);

  try {
    const result = await pets.deleteOne({_id: mongodb.ObjectID(ID)});
    console.log('Deleted new animal');
    res.json(result);
  } catch(e) { 
    console.log('Deleting animal failed! Error: ', e);
    res.json("Deleting animal failed!");
  } 
});

// ==============================================
// Register
app.post("/register", async (req, res) => {

  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email
  const password = req.body.password;
  const role = req.body.role;
  
  try {
    const result = await users_db.insertOne({name, username, email, password, role});
    console.log('Added new user');
    res.json(result);
  } catch(e) { 
    console.log('Adding user failed! Error: ', e);
    res.json("Adding user failed!");
  } 
});

// ==============================================
// Login
app.post("/login", (req, res) => {

  // TODO::
  //  -Step 1: Search through database by username
  //  -Step 2: Compare entered password against the stored password

  
  if (req.body.username === "johndoe" && req.body.password === "qwerty") {

    const token = jwt.sign({ name: "John Doe", favColor: "green" }, jwtsecret);
    res.json({ status: "success", token: token });
  } 
  else {
    res.json({ status: "failure" });
  }
});

// ==============================================

app.post("/topsecret", (req, res) => {

  // get token from payload
  const token = req.body.token;
  
  jwt.verify(token, jwtsecret, function (err, decoded) {
    
    if (err) {
      res.json({ status: "failure" });
    } 
    else {
      res.json({ status: "success", message: `Hello ${decoded.name} your favorite color is ${decoded.favColor} and we can tell you the secret info that the sky is blue.` });
    }
  })
});

// ==============================================

module.exports = app;