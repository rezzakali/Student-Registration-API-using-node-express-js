const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already exists!"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email id!");
      }
    },
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return [/\d{3}-\d{3}-\d{4}/.test(v)];
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
  address: {
    type: String,
    required: true,
  },
  collegename: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

// creating a model using this Schema
const studentModel = new mongoose.model("student_registration", studentSchema);

module.exports = studentModel;
