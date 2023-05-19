const connexion = require('../../config/db');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 1;
dotenv.config();
const express = require('express');
const app = express();
app.use(bodyParser.json());


function auth_user(app) {
    app.post('/register', (req, res) => {
    var {email, password, name, firstname} = req.body;
    var pass = req.body.password;
    bcrypt
    .genSalt(saltRounds)
    .then(salt => {
      return bcrypt.hash(pass, salt)
    })
    .then(hash => {
      pass = hash;
      password = pass;
      var values = [email, password, name, firstname];
      const sql = 'INSERT INTO user_table (email_user, password_user, name_user, firstname_user) VALUES (?, ?, ?, ?)';
      connexion.query('SELECT email_user FROM user_table WHERE email_user = ?', [email], (error, results) => {
        if (results.length > 0) {
          res.status(500).json({ msg: "Invalid Credentials" });
        } else {
          connexion.query(sql, values, (error, results) => {
            if (error) {
              console.error('Error', error);
              res.status(500).json({ msg: "Internal server error" });
            } else {
              token = jsonwebtoken.sign({ email: email }, email);
              res.status(200).json({token: token});
            }
          });
        }
      })
    })
    .catch(err => console.error(err.message))
  });

  app.post('/login', (req, res, next) => {
    const email = req.body.email;
    const pass = req.body.password;
    var token = null;
  
    connexion.query('SELECT email_user, password_user FROM user_table WHERE email_user = ?', [email], (error, results) => {
      if (results.length > 0) {
        const hashedPassword = results[0].password_user;
  
        bcrypt.compare(pass, hashedPassword, (err, isMatch) => {
          if (err) {
            console.error('Error', err);
            res.status(500).json({ msg: "Internal server error" });
          } else if (isMatch) {
            token = jsonwebtoken.sign({ email: email }, email);
            res.status(200).json({ token: token });
          } else {
            res.status(401).json({ msg: "Invalid Credentials" });
          }
        });
      } else {
        res.status(401).json({ msg: "Invalid Credentials" });
      }
    });
  });
}

  module.exports = {
    auth_user : auth_user
}