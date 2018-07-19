let mysql = require("mysql");
let inquirer = require("inquirer");
let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    bamazon();
});

function bamazon() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt([{
            name: "productChoice",
            type: "list",
            choices: function () {
                let productArr = [];
                for (let i = 0; i < results.length; i++) {
                    productArr.push(results[i].product_name);
                }
                return productArr;
            },
            message: "What would you like to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (quantity) {
                var reg = /^\d+$/;
                return reg.test(quantity) || "Please enter a whole number!";
            }
        }]).then(function (userChoice) {
            let chosenItem;
            for (let i = 0; i < results.length; i++) {
                if (results[i].product_name === userChoice.productChoice) {
                    chosenItem = results[i];
                    if (chosenItem.stock_quantity < userChoice.quantity) {
                        console.log("\n\n***Sorry! We don't have enough " + chosenItem.product_name + " in stock! Try a lower quantity!***\n\n")
                        bamazon();
                    }
                    else {
                        let updateStock = parseInt(chosenItem.stock_quantity - userChoice.quantity)
                        let orderTotal = (userChoice.quantity * chosenItem.price)
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: updateStock
                                },
                                {
                                    item_id: chosenItem.item_id
                                }
                            ],
                            function (error) {
                                if (error) throw err;
                                console.log("\n\n***Order complete! Your " + userChoice.quantity + " " + chosenItem.product_name + " comes to $" + orderTotal + ".***\n\n")
                                inquirer.prompt([{
                                    name: "endSale",
                                    type: "list",
                                    choices: ["Yes", "No"],
                                    message: "Would you like to make another purchase?"
                                }]).then(function (response) {
                                    if (response.endSale === "Yes") {
                                        bamazon();
                                    }
                                    else {
                                        console.log("\n\n***Thanks for shopping with us today! We TOTALLY value you as a customer!***\n\n")
                                        connection.end();
                                    }
                                })
                            })
                    }
                }
            }
        })
    })
}