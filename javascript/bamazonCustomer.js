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
            },
            {
                type: "input",
                message: "How many items would you like to purchase?",
                name: "quantity"
            }
        ])
        .then(answer => {
            const item = answer.userChoice;
            const quantity = answer.quantity;
            searchSQL(item, quantity);

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

function searchSQL(item, quantity) {
    connection.query("SELECT * FROM products WHERE ?", { product_name: item }, (err, res) => {
        if (err) throw err;
        console.log(`The price is $${res[0].price},and there are currently ${res[0].stock_quantity} in stock`);
        if (parseFloat(res[0].stock_quantity) - parseFloat(quantity) > 0) {
            let remainder = parseFloat(res[0].stock_quantity) - parseFloat(quantity)
            let cost = parseFloat(res[0].price) * parseFloat(quantity);
            connection.query("UPDATE products SET stock_quantity = " + remainder + " WHERE item_id = " + res[0].item_id)
            console.log(`You have purchased ${quantity} for $${cost}. There are now ${remainder} in stock.`)
        } else if (res[0].stock_quantity - parseFloat(quantity) < 0) {
            console.log("Invalid Quantity")
        }
    }
    )
};


