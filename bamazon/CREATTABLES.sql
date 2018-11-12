USE bamazon_db;

CREATE TABLE departments (

department_id INTEGER NOT NULL AUTO_INCREMENT,
department_name VARCHAR(40),
over_head_costs INTEGER(10),
PRIMARY KEY (department_id)

);