/*
** EPITECH PROJECT, 2023
** user.js
** File description:
** user.query.js
*/

const connexion = require('../../config/db');
const user_query = require('./user.query.js');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");
dotenv.config();
const express = require('express');
const app = express();
app.use(bodyParser.json());

function user_routes(app) {
  app.get('/user', (req, res) => {
      const token = req.header('Authorization');
      if (!token) {
        res.status(499).json({ msg: "No token, authorization denied" });
        return;
      }
      const base64 = token.split('.')[1];
      const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

      jsonwebtoken.verify(token, decoded.email, (err, decoded) => {
        if (err) {
          res.status(498).json({ msg: "Token is not valid" });
        } else {
          const decoded = jsonwebtoken.decode(token);
          user_query.getCurrentUser(decoded.email, res, decoded, (error, user) => {
            if (error) {
              res.status(error.status).json({ msg: error.message });
            } else {
              res.status(200).json(user);
            }
          });
        }
    });
  });

  app.get('/user/todos', (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(499).json({ msg: "No token, authorization denied" });
        return;
    }
    const base64 = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    jsonwebtoken.verify(token, decoded.email, (err, decoded) => {
        if (err) {
            res.status(500).json({ msg: "Token is not valid" });
        } else {
            const email = decoded.email;
            user_query.getUserTodo(decoded.email, res, (error, user) => {
                if (error) {
                    res.status(error.status).json({ msg: error.message });
                } else {
                    res.status(200).json(user);
                }
            });
        }
    });
});

  app.get('/users/:id', (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
      res.status(499).json({ msg: "No token, authorization denied" });
      return;
    }
    const base64 = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    jsonwebtoken.verify(token, decoded.email, (err, decoded) => {
      if (err) {
        res.status(498).json({ msg: "Token is not valid" });
      } else {
        user_query.getUserbyID(req, res, (error, user) => {
          if (error) {
            res.status(error.status).json({ msg: error.message });
        } else {
            res.status(200).json(user);
        }
        });
      }
    });
  });

  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { email, password, firstname, name } = req.body;
    const sql = 'SELECT id_user FROM user_table WHERE id_user = ?';
    const values = [email, password, firstname, name, id];
    const sql_2 = 'UPDATE user_table SET email_user = ?, password_user = ?, name_user = ?, firstname_user = ? WHERE id_user = ?';
    const token = req.header('Authorization');
    if (!token) {
      res.status(499).json({ msg: "No token, authorization denied" });
      return;
    }
    const base64 = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    jsonwebtoken.verify(token, decoded.email, (err, decoded) => {
      if (err) {
        res.status(498).json({ msg: "Token is not valid" });
      } else {
        user_query.putUserbyID(req, res, (error, user) => {
          if (error) {
            res.status(error.status).json({ msg: error.message });
        } else {
            res.status(200).json(user);
        }
        });
      }
    });
  });

  app.delete('/users/:id', (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
      res.status(499).json({ msg: " No token, authorization denied" });
      return;
    }
    const base64 = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    jsonwebtoken.verify(token, decoded.email, (err, decoded) => {
      if (err) {
        res.status(498).json({ msg: "Token is not valid" });
      } else {
        user_query.deleterUserbyID(req, res, (error, user) => {
          if (error) {
            res.status(error.status).json({ msg: error.message });
        } else {
            res.status(200).json(user);
        }
        });
      }
    });
  });
}

  module.exports = {
    user_routes : user_routes
  }
