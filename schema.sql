DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100),
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INT NOT NULL DEFAULT 0,
  product_sales INT NOT NULL DEFAULT 0,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
	department_id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(100),
  overhead_costs INT,
  PRIMARY KEY (department_id)
)