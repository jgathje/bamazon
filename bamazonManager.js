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
    inquirer.prompt([{
        name: "choice",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],
        message: "What would you like to do?"
    }]).then(function (response) {
        if (response.choice === "View Products for Sale") {
            connection.query("SELECT * FROM products", function (err, response) {
                if (err) throw err;
                for (let i = 0; i < response.length; i++) {
                    console.log("Product ID: " + response[i].item_id)
                    console.log("Product Name: " + response[i].product_name)
                    console.log("Product Department: " + response[i].department_name)
                    console.log("Product Price: $" + response[i].price)
                    console.log("Product Stock Quantity: " + response[i].stock_quantity + "\n")
                }
                endBam();
            });
        }
        else if (response.choice === "View Low Inventory") {
            connection.query("SELECT * FROM products", function (err, response) {
                if (err) throw err;
                for (let i = 0; i < response.length; i++) {
                    if (response[i].stock_quantity <= 5) {
                        console.log("Product ID: " + response[i].item_id)
                        console.log("Product Name: " + response[i].product_name)
                        console.log("Product Department: " + response[i].department_name)
                        console.log("Product Price: $" + response[i].price)
                        console.log("Product Stock Quantity: " + response[i].stock_quantity + "\n")
                    }
                }
                endBam();
            })
        }
        else if (response.choice === "Add To Inventory") {
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
                    message: "To which product would you like to add inventory?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How much would you like to add?",
                    validate: function (quantity) {
                        var reg = /^\d+$/;
                        return reg.test(quantity) || "Please enter a number!";
                    }
                }]).then(function (userChoice) {
                    let chosenItem;
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].product_name === userChoice.productChoice) {
                            chosenItem = results[i];
                            let updateStock = parseInt(chosenItem.stock_quantity) + parseInt(userChoice.quantity)
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
                                function (err) {
                                    if (err) throw err;
                                    console.log("You have succesfully added " + userChoice.quantity + " " + userChoice.productChoice + " to your inventory!")
                                    console.log("Your new total is: " + updateStock + ".");
                                    endBam();
                                })
                        }
                    }
                })
            })
        }
        else if (response.choice === "Add New Product") {
            inquirer.prompt([{
                name: "product_name",
                type: "input",
                message: "What product would you like to add?",
            },
            {
                name: "department_name",
                type: "input",
                message: "In which department does the product belong?"

            },
            {
                name: "price",
                type: "input",
                message: "What is the retail price of the product(Enter price as a whole number where the last two numbers are the decimal. For example, 300 will equal $3.00)?",
                validate: function (quantity) {
                    var reg = /^\d+$/;
                    return reg.test(quantity) || "Please enter a number!"
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How much inventory would you like to add?",
                validate: function (quantity) {
                    var reg = /^\d+$/;
                    return reg.test(quantity) || "Please enter a number!"
                }
            }]).then(function (response) {
                function insertDecimal(num) {
                    return (num / 100).toFixed(2);
                }
                let price = insertDecimal(response.price)
                connection.query(
                    "INSERT INTO products SET ?",
                    [
                        {
                            product_name: response.product_name,
                            department_name: response.department_name,
                            price: price,
                            stock_quantity: response.quantity
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("\nYou have succesfully added " + response.quantity + " " + response.product_name + " to your inventory!")
                        console.log("You can find it in the " + response.department_name + " section for $" + price + ".\n")
                        endBam();
                    })
            })

        }
    });
}

function endBam() {
    inquirer.prompt([{
        name: "choice",
        type: "list",
        choices: ["Yes", "No"],
        message: "Would you like to search again?"
    }]).then(function (response) {
        if (response.choice === "Yes") {
            bamazon();
        }
        else {
            console.log("Have a good day, boss!");
            connection.end();
        }
    })
}