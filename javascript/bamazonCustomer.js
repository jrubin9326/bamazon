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
            }
        ])
        .then(answer => {
            var item = answer.userChoice;
            console.log(item)
            searchSQL(item);
        });
}

function displayProducts() {
    connection.query('SELECT * FROM products', (err, res) => {
        if (err) throw error;
        res.forEach((item, value) => {
            console.log(`*************************\nItem Name: ${res[value].product_name} \nItem Price: ${res[value].price}\nQuantity: ${res[value].stock_quantity} \nItem Department: ${res[value].department_name}\n`);
        });
        promptCustomer();
    }
    );
}

function searchSQL(item) {
    connection.query("SELECT * FROM products WHERE ?", { product_name: item }, (err, res) => {
        console.log(res[0].product_name, res[0].price, res[0].stock_quantity);
    }
    )
}; 
