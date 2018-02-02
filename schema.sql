DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	 item_id INT NOT NULL,
	 product_name VARCHAR (200) NULL,
	 department_name VARCHAR (300) NULL,
	 price DECIMAL (10,2) NOT NULL,
	 stock_quantity INT NOT NULL,
 PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, 'Spigen iPhone 8 Case', 'Cell Phones & Accessories', 9.99, 3);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2, 'Gavin Bike Cycling Shoe', 'Sports & Outdoors', 54.95, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (3, 'Beats Solo 3 Wireless', 'Electronics', 228.00, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4, 'Deep Steep Bubble Bath Soup', 'Beauty & Personal Care', 12.95, 6);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5, 'Yogi Bedtime Herbal Tea', 'Health & Household', 6.48, 8);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (6, 'Serious Steel Pull Up Assist Resistance Band', 'Sports & Outdoors', 22.90, 6);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (7, 'Whey Protein Powder', 'Health & Household', 29.99, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8, 'Fitgirl Padded Ankle Strap', 'Sports & Outdoors', 11.97, 6);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (9, 'iCooker Spiralizer Spiral Slicer', 'Home & Kitchen', 9.95, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, 'Wilderness Trail Treats', 'Pet Supplies', 16.74, 6);


SELECT*FROM products;

