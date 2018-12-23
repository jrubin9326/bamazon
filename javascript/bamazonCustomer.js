var inquirer = require("inquirer");
var mysql = require("mysql");
require('dotenv').config()
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.username,
    password: process.env.user_password,
    database: process.env.my_database
});

connection.connect(err => {
    if (err) throw err;
});

