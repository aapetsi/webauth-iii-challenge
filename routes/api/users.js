const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// auth middleware
const restricted = require("../../middlewares");

// load user model
const User = require("../../models/Users");

// @route    GET   api/users/test
// @desc     Test users route
// @access   Public
router.get("/test", (req, res) => {
  res.json({ message: "Users route works" });
});

// @route    GET   api/users/
// @desc     Gets all users from database
// @access   Private
router.get("/", restricted, (req, res) => {
  User.find()
    .then(users => {
      if (!users) {
        return res.status(404).json({ message: "No users found" });
      }
      res.status(200).json(users);
    })
    .catch(err => res.status(500).json(err));
});

// @route    POST   api/users/register
// @desc     Register users
// @access   Public
router.post("/register", (req, res) => {
  const newUser = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };
  User.find(newUser)
    .then(user => {
      if (user.length) {
        console.log(user);
        return res.status(400).json({ message: "This user already exists" });
      }

      newUser.password = bcrypt.hashSync(newUser.password, 10);
      return User.save(newUser)
        .then(user => {
          return res.json(user);
        })
        .catch(err => {
          res.json({ message: `Unable to save user. ${err.message}` });
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `Unable to register new user. ${err.message}` });
    });
});

// @route    POST   api/users/login
// @desc     Login user
// @access   Public
router.post("/login", (req, res) => {
  let userCred = { email: req.body.email, password: req.body.password };
  User.find(userCred)
    .then(user => {
      if (user[0] && bcrypt.compareSync(userCred.password, user[0].password)) {
        const token = generateToken(user[0]);

        res
          .status(200)
          .json({ message: `Welcome ${user[0].username}!`, token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    email: user.email
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
