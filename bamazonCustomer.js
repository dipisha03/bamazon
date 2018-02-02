// Create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale. 

// Requiring mysql and inquirer packages 
var mysql = require('mysql');
var inquirer = require('inquirer');

// Connecting to the database 
var connection = mysql.createConnection({
    host: 'localhost',
    port:5000,
    user: 'root',
    password: 'Aquajava!03',
    database: 'bamazon_db'

});

// Executing a connection 
connection.connect(function(err) {
    if (err) throw err;
    start();
})

// The app should then prompt users with two messages.
 // * The first should ask them the ID of the product they would like to buy.
   // * The second message should ask how many units of the product they would like to buy.

// Creating a function to prompt the user with message one [itemID]
function start() {
    inquirer.prompt({
        name: 'itemID',
        type: 'input',
        message: 'What is the ID of the item you would like to buy? [Quit to Q]',
        choices: ['1', '2', '3','4', '5','6','7','8','9','10']
    })
    .then(function(answer) {
      if(answer.itemID === "itemID"){
        postAuction();
      }else{
          bidAuction();
      } 
    })
}
  

// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   // * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   // * This means updating the SQL database to reflect the remaining quantity.
   // * Once the update goes through, show the customer the total cost of their purchase.