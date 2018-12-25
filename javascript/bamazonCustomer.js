const inquirer = require("inquirer");
const mysql = require("mysql");
require('dotenv').config()

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});




connection.connect(err => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayProducts()
});

function promptCustomer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the item you would like to purchase?",
                name: "userChoice",
                validate: value => {
                    isNaN(value) ? false : true;
                }
            }
        ])
        .then(answer => {
            const query = "SELECT product_name, price, stock_quantity FROM products WHERE ?"
            console.log("USER CHOICE: " + userChoice);
        });
}

function displayProducts() {
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw error;
        res.forEach((item, value) => {
            console.log(`******\nItem Name: ${res[value].product_name} \nItem Price: ${res[value].price}\nQuantity: ${res[value].stock_quantity} \nItem Department: ${res[value].department_name}\n******* `);
        });
        promptCustomer();
    }
    );
}



