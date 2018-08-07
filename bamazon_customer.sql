CREATE DATABASE bamazon;
USE bamazon;


CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2),
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Clothing", 40, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirts", "Clothing", 20, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 30, 12);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Deoderant", "Toiletries", 5, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toothpaste", "Toiletries", 10, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mountain Bike", "Sporting", 500, 5);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bike Helmet", "Sporting", 50, 9);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fishing Rod", "Sporting", 45, 11);

SELECT * FROM products;