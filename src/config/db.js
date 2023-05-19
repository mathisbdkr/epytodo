const mysql = require('mysql2');

const connexion = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME
})

connexion.connect((error) => {
    if (error) {
      console.error('Error server', error);
    } else {
      console.log('Connexion succeded');
    }
  });
module.exports = connexion;
