
// Dependencies  
var mysql = require('mysql');
var inquirer = require('inquirer');
var table = require('cli-table');

// Connecting to the database 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Aquajava!03',
    database: 'bamazon_db'
});

// Checking for error in connection 
connection.connect(function(err){
    if (err) throw err;
    displayItems();
});

// Creating a function to update the db based on customers request
function butItem(itemID, stock, quantity) {
    var newStock = stock - quantity;
    connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ? AND stock_quantity = ?', [newStock, itemID, stock],
    function(error, results){
        if(error) throw error;
        console.log ("Successfully Purchased!");
        displayItems();
    });
};

// Displaying all the items for sale from the database
function displayItems() {
    connection.query('SELECT * FROM products', function (error, results){
        products = res;
        if (error) throw error;
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity' ], 
            colWidths: [5, 60, 30, 10, 10],
            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔', 'top-right': '╗',   'bottom': '═' , 'bottom-mid': '╧' ,
            'bottom-left': '╚' , 'bottom-right': '╝',   'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
          });
        products.forEach(element => {
            table.push([
              element.item_id, 
              element.product_name,
              element.department_name,
              element.price,
              element.stock_quantity
            ]);
          });
          console.log(table.toString());
          questions() 
        });
      };

// Asking customers the item ID and quantity they want to buy
function questions(results) {
	inquirer.prompt([
		{
            name: "item_id",
            type: "input",
			message: "What is the ID of the item you want to buy?"	
		},	
		{
            name: "quantity",
			type: "input",
			message: "How many do you want to buy?"
		}

	]).then(function(answer){

        findItem(answer)
    })
};

// Checking if the store has enough items in stock 
function findItem(answer){
    products.forEach(item => {
      if (item.item_id == answer.buy_id){
        processOrder(item, answer)
      }
    });
};

function processOrder(item, answer){
    console.log(JSON.stringify(item)  + " item")
    if (item.stock_quantity >= answer.amount){
      var newQuantity = item.stock_quantity - answer.amount
      connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: newQuantity}, {item_id: item.item_id}])
      console.log('Total Cost = ' + item.price * answer.amount)
    } else {
      console.log("Insufficient Quantity!");
    }
  };
   
  module.exports = {
    displayItems
  }