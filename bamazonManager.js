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
    type: "rawlist", name: "action", message: "Choice ", choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
  }
  ).then(function (answer) {
    switch (answer.action) {
      case "View Products for Sale":
        queryAlldata();
        break;
      case "View Low Inventory":
        queryDataless5();
        break;
      case "Add to Inventory":
        queryAdd();
        break;
      case "Add New Product":
        queryAddNew();
        break;
    }
  });
}

function queryAlldata() {               // mostrar todos los datos de la base
  connection.query("SELECT item_id AS ITEM, product_name AS PRODUCTS, price AS PRICE, stock_quantity AS QUANTITIES FROM products;", function (err, res) {
    console.log("-----------------------------------\n");
    console.log("THIS IS WHAT WE HAVE:".blue.bold);
    console.table(res);
    console.log("-----------------------------------\n");
    connection.end();
  });
};

function queryDataless5() {
  connection.query("SELECT item_id AS ITEM, product_name AS PRODUCTS, price AS PRICE, stock_quantity AS QUANTITIES FROM products WHERE stock_quantity < 5;", function (err, res) {
    console.log("-----------------------------------\n");
    console.log("THIS ARE ITEMS BELOW 5 UNITS:".blue.bold)
    console.table(res);
    console.log("-----------------------------------\n");
    connection.end();
  });
};



function queryAdd() {
  inquirer.prompt([
    {
      type: "input",
      name: "item_id",
      message: "Which item do you want to add: ",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    },
    {
      type: "input",
      name: "quantityAdd",
      message: "How many do you want to add: ",
      validate: function (value) {
        if (isNaN(value) === false && value > 0) {
          return true;
        }
        return false;
      }
    }
  ]
  ).then(function (answer) {
    connection.query("SELECT * FROM products", function (err, res) {
      var actualStock = res[answer.item_id - 1].stock_quantity;

      var item_idAdd = answer.item_id;
      var unitsAdd = answer.quantityAdd;
      var newStock = parseInt(unitsAdd) + parseInt(actualStock);

      console.log(actualStock);
      console.log(unitsAdd);
      console.log(newStock);

      var sql = "UPDATE products SET stock_quantity = " + "'" + newStock + "'" + " WHERE item_id = " + "'" + item_idAdd + "'" + ";";
      console.log(sql);
      connection.query(sql, function (err, result) {
        //console.log(result.affectedRows + " record(s) updated");
        console.log(("Products updated! " + "to " + newStock).red);
        console.log("-----------------------------------\n");
        connection.end();
      });

    });
  });
}; // end function



function queryAddNew() {

  inquirer.prompt([
    {
      type: "input",
      name: "newName",
      message: "What is Product Name: ",
      validate: function (value) {
        if (isNaN(value) === true) {
          return true;
        }
        return false;
      }
    },
    {
      type: "input",
      name: "newDepartement",
      message: "What is Department: ",
      validate: function (value) {
        if (isNaN(value) === true) {
          return true;
        }
        return false;
      }
    },
    {
      type: "input",
      name: "newPrice",
      message: "What is the price: ",
      validate: function (value) {
        if (isNaN(value) === false && value > 0) {
          return true;
        }
        return false;
      }
    },
    {
      type: "input",
      name: "newQuantity",
      message: "How many do you want to add: ",
      validate: function (value) {
        if (isNaN(value) === false && value > 0) {
          return true;
        }
        return false;
      }
    }

  ]
  ).then(function (answer) {
    console.log("Inserting a new product...\n");

    var anew = answer.newName;
    var bnew = answer.newDepartement;
    var cnew = answer.newPrice;
    var dnew = answer.newQuantity;
    var sql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (" + "'" + anew + "'" + "," + "'" + bnew + "'" + "," + cnew + "," + dnew + ")";
    console.log(sql);

    connection.query(sql, function (err, result) {
      console.log(("Product added! ").red.bold);
      console.log("-----------------------------------\n");
      connection.end();
    });
  });
  
};