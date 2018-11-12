USE bamazon_db;
INSERT INTO departments (department_name, over_head_costs ) VALUES ('Toys','5000');

SELECT distinct departments.department_id AS ID, departments.department_name AS DEPARTMENT, departments .over_head_costs AS OVER_HEAD_COST, SUM(products.product_sales) AS TOTAL_SALES, (SUM(products.product_sales)- departments .over_head_costs) AS TOTAL_PROFIT
FROM departments 
INNER JOIN products ON departments.department_name=products.department_name
GROUP BY departments.department_id;