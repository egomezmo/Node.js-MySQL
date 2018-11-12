var inquirer = require("inquirer");     // npm inquire
var mysql = require("mysql");           // npm mysql
var color = require("colors");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,                           // Your port; if not 3306
  user: "root",                         // Your username
  password: "root",                     // Your password
  database: "bamazon_db"
});

connection.connect(function (err) {     // conecvtarse a la base de datos
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAlldata();
});


function queryAlldata() {               // mostrar todos los datos de la base
  connection.query("SELECT * FROM products", function (err, res) {
    console.log("-----------------------------------\n");
    console.log("THIS IS WHAT WE OFFER YOU:".blue);
    console.log(("Id  " + "Product                                    " + "Deparment     " + "Price   " + "Quantity ").bold);
    console.log("-----------------------------------------------------------------------------".bold);
    for (var i = 0; i < res.length; i++) {
      var pname = res[i].product_name;
      var pshort = pname.slice(0, 40);

      console.log(res[i].item_id + " | " + pshort + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------\n");
    takeOrder();
  });
};

function takeOrder() {
  inquirer.prompt([
    {
      type: "input",
      name: "idProduct",
      message: "ID of the product they would like to buy: ",
      validate: function (value) {
        if (isNaN(value) === false && value > 0 && value < 11) {
          return true;
        }
        return false;
      }
    },
    {
      type: "input",
      name: "quantity",
      message: "How many units of the product they would like to buy: ",
      validate: function (value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    }
  ]).then(function (response) {
    connection.query("SELECT * FROM products", function (err, res) {
      var aa = response.idProduct;
      var c = res[response.idProduct - 1].product_name;         // nombre del producto escogido
      var cc = c.slice(0, 58) + "...";
      var d = res[response.idProduct - 1].price;                // precio del producto escogido
      var e = res[response.idProduct - 1].stock_quantity;       // cantidad en existencia
      var zSales = res[response.idProduct - 1].product_sales;   // accumulate amount of sales in money
      var f = response.quantity;                                // cantidad de piezas escogidas
      var tSale = f * d;                                            // monto total de la compra
      var totalSale = tSale + zSales;
      var h = e - f;                                            // rest los productos vendidos; 

      if (f > e) {
        console.log("-----------------------------------\n");
        console.log("You asked for: " + f + " units");
        console.log("Insufficient quantity!".red.bold);
        console.log("Avalaible units: " + e);
        console.log("Product: " + cc);
        console.log("-----------------------------------\n");
        connection.end(); // aqui me gustaria regresar al inquerer
        
      } else {
        console.log("-----------------------------------\n");
        console.log("INVOICE".red);
        console.log(("ITEM                                                           | QUANTITY    | PRICE  | TOTAL AMOUNT").blue.bold);
        console.log(cc + "    " + f + "             " + d + "    " + tSale);
        console.log("-----------------------------------\n");

        updateProduct();
        function updateProduct() {                                        // funcion para restar lo que se compro

          console.log("Updating product quantities...\n");

          var sql = "UPDATE products SET stock_quantity = " + "'" + h + "'" + " WHERE item_id = " + "'" + aa + "'" + ";";       // change in quantity sales products
          var sql2 = "UPDATE products SET product_sales = " + "'" + totalSale + "'" + " WHERE item_id = " + "'" + aa + "'" + ";";  // chnage in total amount of sales

          console.log(sql);

          connection.query(sql, function (err, result) {
            console.log(("Products updated! " + "to " + h).red);
            console.log("-----------------------------------\n");
            
          });

          connection.query(sql2, function (err, result) {
            connection.end();
          });


        }     // ends function update


      }
    });


  });
} // ends function takeOrder