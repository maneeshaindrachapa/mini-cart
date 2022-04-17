var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mini-cart",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to mini-cart database!");
});

module.exports = connection;
