const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/student_register")
  .then(() => {
    console.log("Connection successfully established!");
  })
  .catch((error) => {
    console.log(error.message);
  });
