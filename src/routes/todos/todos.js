/*
** EPITECH PROJECT, 2023
** user.js
** File description:
** user.query.js
*/

const connexion = require('../../config/db');
const user_query = require('./todos.query.js');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const jsonwebtoken = require("jsonwebtoken");
dotenv.config();
const app = express();
app.use(bodyParser.json());


function todo_routes(app) {
app.post('/todos', (req, res) => {
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
        user_query.createTodo(req, res, (error, user) => {
          if (error) {
            res.status(error.status).json({ msg: error.message });
          } else {
            res.status(200).json(user);
          }
        });
      }
    });
  });

  app.put('/todos/:id', (req, res) => {
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
        user_query.modifyTodobyId(req, res, (error, user) => {
          if (error) {
            res.status(error.status).json({ msg: error.message });
          } else {
            res.status(200).json(user);
          }
        });
      }
    });
  });

  app.get('/todos/:id', (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
      res.status(499).json({ msg: " No token, authorization denied " });
      return;
    }
    const base64 = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    jsonwebtoken.verify(token, decoded.email, (err, decoded) => {
      if (err) {
        res.status(498).json({ msg: "Token is not valid" });
      } else {
        user_query.getTodobyID(req, res, (error, user) => {
          if (error) {
            res.status(error.status).json({ msg: error.message });
          } else {
            res.status(200).json(user);
          }
        });
      }
    });
  });

  app.get('/todos', (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
      res.status(499).json({ msg: " No token, authorization denied " });
      return;
    }
    const base64 = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    jsonwebtoken.verify(token, decoded.email, (err, decoded) => {
      if (err) {
        res.status(498).json({ msg: "Invalid Token" });
      } else {
        user_query.GetallTodos(req, res, (error, user) => {
          if (error) {
            res.status(error.status).json({ msg: error.message });
          } else {
            res.status(200).json(user);
          }
        });
      }
    });
  });

  app.delete('/todos/:id', (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
      res.status(499).json({ msg: " No token, authorization denied " });
      return;
    }
    const base64 = token.split('.')[1];
    const decoded = JSON.parse(Buffer.from(base64, 'base64').toString('ascii'));

    jsonwebtoken.verify(token, decoded.email, (err, decoded) => {
      if (err) {
        res.status(498).json({ msg: "Token is not valid" });
      } else {
        user_query.DeleteTodobyId(req, res, (error, user) => {
          if (error) {
            res.status(error.status).json({ msg: error.message });
          } else {
            res.status(200).json(user);
          }
        });
    }
    });
  })};
  module.exports = {
    todo_routes : todo_routes
  }
