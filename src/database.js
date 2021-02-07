const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: "empresa.cg1cyq2fx5aq.eu-central-1.rds.amazonaws.com",
    user: "admin",
    password: "4dm1n2021",
    database: "app"
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('db is connected');
  }
});

module.exports = mysqlConnection;