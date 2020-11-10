const mongoose = require('mongoose')
const express = require('express')
const app = express()
const db = require('./config/keys').mongoURI
const bodyParser = require('body-parser');

//Importing Routes
const users = require('./routes/api/users')

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Routes
app.get("/", (req, res) => res.send("Hello World"))
app.use("/api/users", users)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`))
