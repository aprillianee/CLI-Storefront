--DROP DATABASE IF EXISTS bamazon;

--CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Aztec Clay", "Personal Care", 10.00, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Bluetooth Headphones", "Electronics", 40.00, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Macbook Pro", "Electronics", 999.00, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Infinity Net", "Books", 35.00, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Echo Dot", "Electronics", 50.00, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Umbrian Clay", "Personal Care", 90.00, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Oil Diffuser", "Health & Household", 40.00, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Game of Thrones", "Movies & TV", 65.00, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Scented Candle", "Home & Kitchen", 20.00, 50);

INSERT INTO products (product_name, department_name, price, quantity)
VALUES ("Artificial Plant", "Home & Kitchen", 30.00, 50);
