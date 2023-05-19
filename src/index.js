/*
** EPITECH PROJECT, 2023
** index.js
** File description:
** index.js
*/

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(bodyParser.json());
const  { auth_user } = require('./routes/auth/auth');
auth_user(app);
const  { user_routes } = require('./routes/user/user');
user_routes(app);
const  { todo_routes } = require('./routes/todos/todos');
todo_routes(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server execute ${port}`);
});
