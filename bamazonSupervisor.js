var inquirer = require("inquirer");     // npm inquire
var mysql = require("mysql");           // npm mysql
var color = require("colors");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,                           // Your port; if not 3306
  user: "root",                         // Your username
  password: "root",                     // Your password
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  runSearch();
});


function runSearch() {
    inquirer.prompt({
      type: "rawlist", name: "action", message: "Choice ", choices: ["View Product Sales by Department", "Create New Department"]
    }
    ).then(function (answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
          queryData();
          break;
        case "Create New Department":
          queryNewDepartment();
          break;
      }
    });
  }

function queryData(){
    connection.query(
        "SELECT distinct departments.department_id AS ID, departments.department_name AS DEPARTMENT, departments .over_head_costs AS OVER_HEAD_COST, SUM(products.product_sales) AS TOTAL_SALES, (SUM(products.product_sales)- departments .over_head_costs) AS TOTAL_PROFIT FROM departments INNER JOIN products ON departments.department_name=products.department_name GROUP BY departments.department_id;",
         function (err, res) {
        console.log("-----------------------------------\n");
        console.log("View Product Sales by Department".blue.bold);

        console.table(res);
        console.log("-----------------------------------\n");
        connection.end();
      });

}

function queryNewDepartment(){

    inquirer.prompt([
        {
          type: "input",
          name: "department",
          message: "What is departarment name: ",
          validate: function (value) {
            if (isNaN(value) === true) {
              return true;
            }
            return false;
          }
        },
        {
          type: "input",
          name: "overHeadCosts",
          message: "What is the over haead cost of this department: ",
          validate: function (value) {
            if (isNaN(value) === false && value > 0) {
              return true;
            }
            return false;
          }
        }
    
      ]
      ).then(function (answer) {
        console.log("Inserting a new department...\n");
    
        var newDepartment = answer.department;
        var newohCost = answer.overHeadCosts;


        var sql = "INSERT INTO departments (department_name, over_head_costs ) VALUES (" + "'" + newDepartment + "'" + "," + "'" + newohCost + "'" + ");";
        console.log(sql);
    
        connection.query(sql, function (err, result) {
          console.log(("Department added! ").red.bold);
          console.log("-----------------------------------\n");
          connection.end();
        });
      });




}

