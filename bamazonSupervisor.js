let cTable = require('console.table')
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
        choices: ["View Products Sales By Department", "Create New Department"],
        message: "What would you like to do?"
    }]).then(function (response) {
        if (response.choice === "View Products Sales By Department") {
            connection.query(
                "SELECT departments.department_names AS Department, departments.department_id AS 'Department ID', departments.overhead_costs AS 'Overhead Costs', sum(products.product_sales) AS Sales, sum(products.product_sales)-departments.overhead_costs AS Profits FROM departments LEFT JOIN products ON products.department_name = departments.department_names GROUP BY department_id"
                , function (err, results) {
                    if (err) throw err;
                    console.table(results)
                    endBam();
                })
        }
        else {
            inquirer.prompt([
                {
                    name: "new_dep",
                    type: "input",
                    message: "What department would you like to add?"
                },
                {
                    name: "overhead",
                    type: "input",
                    message: "What is the overhead cost of this department?",
                    validate: function (quantity) {
                        var reg = /^\d+(\.\d\d)?$/;
                        return reg.test(quantity) || "Please enter a whole number!"
                    }
                }
            ]).then(function (response) {
                connection.query(
                    "INSERT INTO departments SET ?",
                    [
                        {
                            department_names: response.new_dep,
                            overhead_costs: response.overhead
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        console.log("You have successfully added " + response.new_dep + " to your departments. It has an overhead cost of " + response.overhead)
                        endBam();
                    })
            })
        }
    })
}

function endBam() {
    inquirer.prompt([{
        name: "menu",
        type: "list",
        choices: ["Return To Menu", "Exit"],
        message: "What would you like to do?"
    }]).then(function (response) {
        if (response.menu === "Return To Menu") {
            bamazon();
        }
        else {
            console.log("\n\nHave A Great Day, Supreme Overlord Of Bamazon!\n\n")
            connection.end();
        }
    })
}