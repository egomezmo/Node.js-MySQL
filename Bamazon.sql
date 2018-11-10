DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(200),
    department_name VARCHAR(30),
    price DECIMAL (10,2),
    stock_quantity INTEGER (10),
    PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acer Aspire E 15, 15.6 Full HD, 8th Gen Intel Core i3-8130U, 6GB RAM Memory, 1TB HDD, 8X DVD, E5-576-392H", "electronics",379.99,15),
("ASUS VivoBook F510UA 15.6” Full HD Nanoedge Laptop, Intel Core i5-8250U Processor, 8GB DDR4 RAM, 1TB HDD, USB-C, Fingerprint, Windows 10 Home - F510UA-AH51, Star Gray", "electronics",509.90,6),
("Acer Predator Helios 300 Gaming Laptop, 15.6 FHD IPS w/ 144Hz Refresh Rate, Intel 6-Core i7-8750H, Overclockable GeForce GTX 1060 6GB, 16GB DDR4, 256GB NVMe SSD, Aeroblade Metal Fans PH315-51-78NP", "electronics",1199.00,12),
("Apple iPad 2 MC769LL/A 9.7-Inch 16GB (Black) 1395 - (Renewed)", "electronics",84.99,4),
("Apple MacBook Air MJVM2LL/A Intel i5 1.6GHz 4GB 128GB (Refurbished)", "electronics",503.97,8),
("ravelpro Luggage Crew 11 21 Carry-on Expandable Spinner w/Suiter and USB Port, Black", "Luggage",172.75,5),
("AmazonBasics 15.6-Inch Laptop and Tablet Bag", "Luggage",17.99,10),
("eBags Professional Slim Laptop Backpack (Solid Black)", "Luggage",99.99,10),
("AmazonBasics Hardshell Spinner Luggage, Navy Blue", "Luggage",179.98,2),
("AmazonBasics Hardside Spinner Luggage - 20-Inch, Carry-On", "Luggage",49.99,20);