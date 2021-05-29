const express = require("express");
const app = express();
const client = require("./db.js");
const db = client.db();
const mongodb = require('mongodb');

const dotenv = require("dotenv");
dotenv.config();

const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;

const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const bcrypt = require('bcrypt');
const saltRounds = 10;


// ==============================================

const pets               = client.db("JoshTestDB").collection("pets");
const users_collection   = client.db("JoshTestDB").collection("users");
const classes_collection = client.db("JoshTestDB").collection("classes");

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

app.get("/classes", async (req, res) => {
  try {
    const classes = await classes_collection.find().toArray();
    console.log('classes: ', classes);
    res.status(200).json(classes);
  } catch (err) {
    console.log(err);
    res.status(400).json("Getting classes fron db failed");
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

app.post("/classes", async (req, res) => {
  try {

    // const classes = await classes_collection.find().toArray();
    const result = await classes_collection.insertOne({
      instructor_name: req.body.instructor_name, 
      exercise_type: req.body.exercise_type, 
      intensity: req.body.intensity,
      location: req.body.location,
      duration: req.body.duration,
      class_size: req.body.class_size,
      date: req.body.date
    });

    console.log('/classes :: result.insertedId: ', result.insertedId);

    const id = result.insertedId;
    res.status(200).json(id);
  } catch (err) {
    console.log(err);
    res.status(400).json("Adding class to db failed");
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
  
  // Cryptographically hash password
  bcrypt.genSalt(saltRounds).then((salt) => {
    console.log('salt: ', salt);
    bcrypt.hash(password, salt).then(async function(hash) {
        // Store hash in your password DB.
        console.log('hash: ', hash);
        try {
          const result = await users_collection.insertOne({name, username, email, password: hash, role});
          console.log('Added new user');
          res.status(201).json(result);
        } catch(e) { 
          console.log('Adding user failed! Error: ', e);
          res.status(400).json("Adding user failed!");
        } 
    });
  });
});

// ==============================================
// Login
app.post("/login", async (req, res) => {

  try {
    
    // TODO: Add logic in registration to ensure that usernames are unique
    const users = await users_collection.find({ username: req.body.username }).toArray();
    
    console.log('req.body.username: ', req.body.username);
    console.log('req.body.password: ', req.body.password);
    console.log('users: ', users);
    
    if (users.length > 0) {
      const user = users[0];
      console.log('user: ', user);

      // Compare hashed plain-text password against stored hashed password
      const hash = user.password;
      const plain_text_password = req.body.password;
      bcrypt.compare(plain_text_password, hash, function(err, result) {
        // result == true
        console.log('Password is valid!');

        if (result == true) {
          const token = jwt.sign({ name: "John Doe", favColor: "green" }, jwtsecret);
          res.status(200).json({ status: "success", token: token, role: user.role });
        } else {
          res.status(400).json({ status: "failure" });
        } // if (result == true)
      });

    } else { // if (users > 0)
      res.status(400).json({ status: "username not in database" });
    }

  } catch (err) {
    console.log(err);
    res.status(400).json("No user with that name");
  }

});

// ==============================================

app.post("/topsecret", (req, res) => {

  // get token from payload
  const token = req.body.token;
  
  jwt.verify(token, jwtsecret, function (err, decoded) {
    
    if (err) {
      res.status(400).json({ status: "failure" });
    } 
    else {
      res.status(200).json({ status: "success", message: `Hello ${decoded.name} your favorite color is ${decoded.favColor} and we can tell you the secret info that the sky is blue.` });
    }
  })
});

// ==============================================

module.exports = app;