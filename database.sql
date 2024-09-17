CREATE DATABASE IF NOT EXISTS retail_analytics;

USE retail_analytics;

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100),
    stock INT NOT NULL
);

CREATE TABLE IF NOT EXISTS sales_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sale_date DATE NOT NULL,
    sales DECIMAL(10, 2) NOT NULL,
    product_id INT,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO products (name, price, category, stock) VALUES
('Smartphone X1', 699.99, 'Electronics', 75),
('Laptop Pro 15', 1199.99, 'Electronics', 40),
('Bluetooth Speaker', 89.99, 'Electronics', 150),
('Coffee Maker Deluxe', 149.99, 'Home Appliances', 60),
('Office Chair Ergonomic', 249.99, 'Furniture', 25),
('LED Desk Lamp', 49.99, 'Furniture', 80),
('Fitness Tracker', 129.99, 'Accessories', 120),
('Wireless Earbuds', 99.99, 'Accessories', 200),
('Yoga Mat', 39.99, 'Sports', 180),
('Treadmill Model X', 899.99, 'Sports', 15);

INSERT INTO sales_data (sale_date, sales, product_id) VALUES
('2024-08-01', 699.99, 1), -- Sales for Smartphone X1
('2024-08-01', 1199.99, 2), -- Sales for Laptop Pro 15
('2024-08-01', 89.99, 3), -- Sales for Bluetooth Speaker
('2024-08-02', 149.99, 4), -- Sales for Coffee Maker Deluxe
('2024-08-02', 249.99, 5), -- Sales for Office Chair Ergonomic
('2024-08-03', 49.99, 6), -- Sales for LED Desk Lamp
('2024-08-04', 129.99, 7), -- Sales for Fitness Tracker
('2024-08-05', 99.99, 8), -- Sales for Wireless Earbuds
('2024-08-06', 39.99, 9), -- Sales for Yoga Mat
('2024-08-07', 899.99, 10); -- Sales for Treadmill Model X
