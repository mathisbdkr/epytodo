/*
** EPITECH PROJECT, 2023
** user.js
** File description:
** user.query.js
*/

const connexion = require('../../config/db');

function getCurrentUser(email, res, decoded, call) {
  const sql = 'SELECT * FROM user_table WHERE email_user = ?';
  connexion.query(sql, decoded.email, (error, results) => {
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

  function getUserTodo(email, res, call) {
    const idQuery = 'SELECT id_user FROM user_table WHERE email_user = "' + email + '"';
    connexion.query(idQuery, function (error, results, fields) {
      if (error) {
        res.status(500).json({ msg: "Internal server error" });
        return;
      }
      if (results.length > 0) {
        const id = results[0].id_user;
        const taskQuery = 'SELECT * FROM todo WHERE id_user = "' + id + '"';
        connexion.query(taskQuery, function (error, results, fields) {
          if (error) {
            res.status(500).json({ msg: "Internal server error" });
            return;
          }
          const task = results;
          res.status(200).json(task);
        });
      } else {
        res.status(404).json({ msg: "Not found" });
      }
    });
  }

  function getUserbyID(req, res, call) {
    const id = req.params.id;
    const sql = 'SELECT * FROM user_table WHERE id_user = ? OR email_user = ?';

    connexion.query(sql, [id, id], (error, results) => {
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

  function putUserbyID(req, res, call) {
    const id = req.params.id;
    const { email, password, firstname, name } = req.body;
    const sql = 'SELECT id_user FROM user_table WHERE id_user = ?';
    const values = [email, password, firstname, name, id];
    const sql_2 = 'UPDATE user_table SET email_user = ?, password_user = ?, name_user = ?, firstname_user = ? WHERE id_user = ?';

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
            res.status(404).json({ msg: "Not found" });
          } else {
            const sqlSelect = 'SELECT * FROM user_table WHERE id_user = ?';
            connexion.query(sqlSelect, [id], (selectError, selectResults) => {
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

  function deleterUserbyID(req, res, call) {
    const id = req.params.id;
    const sql = 'DELETE FROM user_table WHERE id_user = ?';

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
  getCurrentUser,
  getUserTodo,
  getUserbyID,
  putUserbyID,
  deleterUserbyID
}