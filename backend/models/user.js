const mongoose = require("mongoose");
const validator = require("validator");

const urlRegex = /^(https?:\/\/)(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "Invalid avatar URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // This will hide the password by default
  },
});

module.exports = mongoose.model("user", userSchema);
