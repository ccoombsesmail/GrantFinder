const mongoose = require('mongoose')
const express = require('express')
const app = express()
const db = require('./config/keys').mongoURI
const bodyParser = require('body-parser');
const requiresAdmin = require('./middleware/admin')
//Importing Routes
const users = require('./routes/api/users')
const grants = require('./routes/api/grants')

//Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.all('/api/grants/admin/*', requiresAdmin());
// Routes
app.get("/", (req, res) => res.send("Hello World"))
app.use("/api/users", users)
app.use("/api/grants", grants)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`))





