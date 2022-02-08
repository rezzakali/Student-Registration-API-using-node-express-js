// external dependencies
const express = require("express");
const dotenv = require("dotenv");

// internal dependencies
const studentModel = require("./Schema/Schemas");

// calling the express and initialize to app object
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// config the dot env variable
dotenv.config();
// database connection
require("./Database/connection");

app.set("view engine", "ejs");

// get route
app.get("/register", (req, res) => {
  res.render("pages/index.ejs");
});

// post route
app.post("/register", async (req, res) => {
  try {
    const data = new studentModel({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      collegename: req.body.collegename,
      department: req.body.department,
    });
    await data.save();
    res.status(200).send("You have successfully register!");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// error handler
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    next();
  }
});

app.listen(process.env.port, process.env.hostname, () => {
  console.log(
    `Your server is running successfully at http://${process.env.hostname}:${process.env.port}`
  );
});
