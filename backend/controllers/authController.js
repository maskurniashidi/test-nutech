require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Email tidak terdaftar" });
      }
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(401).json({ message: "Kata sandi salah" });
          }
          const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY, { expiresIn: "24h" });
          console.log(token, process.env.SECRET_KEY);
          res.json({ token });
        })
        .catch((error) => {
          console.error("Error comparing passwords:", error);
          res.status(500).json({ message: "Error server internal" });
        });
    })
    .catch((error) => {
      console.error("Error finding user:", error);
      res.status(500).json({ message: "Error server internal" });
    });
};

const register = (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }

  User.findOne({ where: { email } })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({ message: "Email sudah terdaftar" });
      }

      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          User.create({ email, password: hashedPassword, role })
            .then(() => {
              res.sendStatus(201);
            })
            .catch((error) => {
              console.error("Error creating user:", error);
              res.status(500).json({ message: "Error server internal" });
            });
        })
        .catch((error) => {
          console.error("Error hashing password:", error);
          res.status(500).json({ message: "Error server internal" });
        });
    })
    .catch((error) => {
      console.error("Error finding existing user:", error);
      res.status(500).json({ message: "Error server internal" });
    });
};

module.exports = {
  login,
  register,
};
