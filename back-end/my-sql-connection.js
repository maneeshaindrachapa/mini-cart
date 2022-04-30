var mysql = require("mysql");

var connection = mysql.createConnection({
  //host: "http://localhost:3306", //if use docker comment this host, else un-comment
  user: "root",
  password: "root",
  database: "mini_cart",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to mini-cart database!");
});

module.exports = connection;
