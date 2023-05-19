/*
** EPITECH PROJECT, 2023
** todos.js
** File description:
** todos.query.js
*/

const connexion = require('../../config/db');

function createTodo(req, res, call) {
    const { title, description, due_time, id_user, status } = req.body;
    const values = [title, description, due_time, id_user, status];
    const sql = 'INSERT INTO todo (title, description, due_time, id_user, status) VALUES (?, ?, ?, ?, ?)';

    connexion.query('SELECT title FROM todo WHERE title = ?', [title], (error, results) => {
    if (results.length > 0) {
      res.status(500).json({ msg: "Internal server error" });
    } else {
      connexion.query(sql, values, (error, results) => {
        if (error) {
          console.error('Error', error);
          res.status(500).json({ msg: "Internal server error" });
        } else {
          const insertedTodoId = results.insertId;
          const sqlSelect = 'SELECT * FROM todo WHERE id_table = ?';
          connexion.query(sqlSelect, [insertedTodoId], (selectError, selectResults) => {
            if (selectError) {
            console.error('Error', selectError);
            res.status(500).json({ msg: "Internal server error" });
            } else {
              const insertedTodo = selectResults[0];
              res.status(200).json(insertedTodo);
            }
          });
        }
      });
    }
  });
}

function modifyTodobyId(req, res, call) {
    const id = req.params.id;
    const { title, description, due_time, id_user, status } = req.body;
    const sql = 'SELECT id_table FROM todo WHERE id_table = ?';
    const values = [title, description, due_time, id_user, status, id];
    const sql_2 = 'UPDATE todo SET title = ?, description = ?, due_time = ?, id_user = ? , status = ? WHERE id_table = ?';

    connexion.query(sql, [id], (error, results) => {
        if (error) {
          console.error('Error', error);
          res.status(500).json({ msg: "Internal server error" });
        } else if (results.length === 0) {
          res.status(404).json({ msg: "Not found" });
        } else {
            connexion.query(sql_2, values, (error, results) => {
              if (error) {
                console.error('Error', error);
                res.status(404).json({ msg: "Bad parameter" });
            } else {
                const insertedTodo = {
                  title,
                  description,
                  due_time,
                  id_user,
                  status
                };
              res.status(200).json(insertedTodo);
            }
          });
        }
      });
}

function getTodobyID(req, res, call) {
    const id = req.params.id;
    const sql = 'SELECT * FROM todo WHERE id_table = ?';

    connexion.query(sql, [id], (error, results) => {
        if (error) {
          console.error('Error', error);
          res.status(500).json({ msg: "Internal server error" });
        } else if (results.length === 0) {
          res.status(404).json({ msg: "Not found" });
        } else {
          const user = results[0];
          res.status(200).json(user);
        }
      });
}

function GetallTodos(req, res, call) {
    const sql = 'SELECT * FROM todo';

    connexion.query(sql, (error, results) => {
        if (error) {
        console.error('Error', error);
        res.status(500).json({ msg: "Internal server error" });
        } else if (results.length === 0) {
          res.status(404).json({ msg: "Not found" });
        } else {
          res.status(200).json(results);
        }
      });
}

function DeleteTodobyId(req, res, call) {
    const id = req.params.id;
    const sql = 'DELETE FROM todo WHERE id_table = ?';

    connexion.query(sql, [id], (error, results) => {
        if (error) {
          console.error('Error', error);
          res.status(500).json({ msg: "Internal server error" });
        } else if (results.affectedRows === 0) {
          res.status(404).json({ msg: "Not found" });
        } else {
          res.status(200).json({ msg: "Successfully deleted record number:"  + id});
        }
      });
}

module.exports = {
    createTodo,
    modifyTodobyId,
    getTodobyID,
    GetallTodos,
    DeleteTodobyId
}