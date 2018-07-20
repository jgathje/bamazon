# BAMAZON

## What it does:
* A node app that utelizes mySQL for persistant data storage
* Uses mySQL, inquirer, and console.table node packages
* Two tables within the database - products and departments.
* Three different interfaces
    * A customer interface
    * A manager interface
    * A supervisor interface
* Customer interface allows customers to select an item of their choice to purchase
    * If the customer's quantity is less than or equal to the stock quantity, they will be shown their total purchase price
    * If the customer's quantity is greater than the available stock quantity, they will be asked for a smaller number
* Manager interface allows a manager to do one of four things:
    1. View all items. This function puts all of the items into a nice, easy to read table
    2. View items with low inventory. This function allows the manager to only view items with 5 or less in stock.
    3. Add inventory. This allows the manager to add inventory to the stock.
    4. Add a new item. This function lets the manager add a new item to the database. Adds item name, price, quantity to add to stock, and the department the item is found in.
* Supervisor interface allows the supervisor to either:
    1. View a profit and loss type table. This joins our two tables and returns up to the second information on total dollar amount of each item sold. 
    2. Add a new department to the database.

## Why it's useful:
* Because I want to pass this course
* A good starting point for a front-end app for a small business, band, sports team, or any other entity that may want to sell something!
## How to get started:
* Choose your role(Customer, Manager, Supervisor) and follow the prompts!