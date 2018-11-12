# Node.js-MySQL

##  This is a Amazon-like storefront.

**bamazonCustomer.js** - Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
The app should then prompt users with two messages:
1. The first should ask them the ID of the product they would like to buy.
1. The second message should ask how many units of the product they would like to buy.

*Compare Order with units in the storage*
Once the customer has placed the order, the application should check if your store has enough of the product to meet the customer's request.
If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

![imagen1](/images/Insufficient_quantity.png)

* Equal or less units order by customers, place the sales*
However, if the store does have enough of the product, you should fulfill the customer's order.

![imagen2](/images/sufficient_quantity.png)


This update the SQL database to reflect the remaining quantity.
It shows the customer the total cost of their purchase in an "Invoice".


**bamazonManager.js** - Manager View.

List a set of menu options:
1. View Products for Sale. The app should list every available item: the item IDs, names, prices, and quantities.
1. View Low Inventory.  It should list all items with an inventory count lower than five.
1. Add to Inventory. It should display a prompt that will let the manager "add more" of any item currently in the store.
1. Add New Product. It should allow the manager to add a completely new product to the store.


**bamazonSupervisor.js** Supervisor view
This application will list a set of menu options
1. View Product Sales by Department. When a supervisor selects View Product Sales by Department, the app should display a summarized table. The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. 
1. Create New Department. This option is to create a new departament.

![imagen3](/images/SupervisorView.png)

![imagen4](/images/Deptos01.png)

![imagen5](/images/Deptos02.png)

#MY PORTFOLIO:
![imagen6](/images/Portfolio.png)

link:
https://egomezmo.github.io/Portfolio-GOME/