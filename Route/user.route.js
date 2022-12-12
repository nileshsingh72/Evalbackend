require("dotenv").config();
const express = require("express");
const { Usermodel } = require("../Model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const isPresent = await Usermodel.findOne({ email });
  if (isPresent) {
    res.send({ msg: "User already exists!" });
  } else {
    try {
      bcrypt.hash(password, 8, async function (err, hash) {
        const newuser = new Usermodel({
          email: email,
          password: hash,
        });
        await newuser.save();
        res.status(200).send({ msg: "User created successfully" });
      });
    } catch (err) {
      console.log("something went wrong");
      res.status(404).send({ msg: err.message });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const isPresent = await Usermodel.findOne({ email });
  if (isPresent) {
    const hash = isPresent.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        var token = jwt.sign({ userID: isPresent._id }, process.env.TOP, {
          expiresIn: "1h",
        });
        res.send({ msg: "Login successful", token: token });
      } else {
        res.send({ msg: "Please login again " });
      }
    });
  } else {
    res.send({ msg: "Please login again " });
  }
});

module.exports = { userRouter };
