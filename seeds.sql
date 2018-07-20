USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Two Turntables", "Music", 74, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("A Microphone", "Music", 38.74, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer ball", "Sports", 20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Horse", "Pets", 10000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Burmese Python", "Pets", 1000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hockey puck", "Sports", 10.99, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bicycle", "Transportation", 500, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tesla Submarine", "Transportation", 1000000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dirty towel", "Misc", 1.50, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Goblet", "Household", 10.43, 1023);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Broken Coleco", "Electronics", 9.99, 5);

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Sports", 10)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Electronics", 1000)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Househould", 42)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Music", 100)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Transportation", 100000)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Pets", 190)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Food/Beverage", 2)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Clothing", 20)

INSERT INTO departments (department_name, overhead_costs)
VALUES ("Misc", 1)

SELECT * FROM products
SELECT * FROM departments