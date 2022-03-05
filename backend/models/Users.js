const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", usersSchema);
