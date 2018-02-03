
// ========================= Dependencies =============================== // 
    var mysql = require('mysql');
    var inquirer = require('inquirer');
    var Table = require('cli-table');


// ==================== Connecting to the database ====================== // 
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Aquajava!03',
        database: 'bamazon_db'
    });

// ============== Checking for error in connection ====================== //
    connection.connect(function(err){
        if (err) throw err;
        displayItems();
    });


// ============ Displaying all the items for sale from the database ========= // 
    function displayItems() {
        connection.query('SELECT * FROM products', function (error, results){
            products = results;
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

// ============== Asking customers the item ID & quantity they want to buy ========== // 
    function questions() {
      inquirer.prompt([
          {
            name: "item_id",
            type: "input",
            message: "What is the ID of the item you want to buy? [Quit to q]" 
          },	
          {
            name: "quantity",
            type: "input",
            message: "How many do you want to buy? [Quit to q]"
          }

// ================= Logic based on customer's answer ============== // 
        ]).then(function(answer){
          // console.log ("$$$ answer", answer)
        var userinputA = (answer.item_id).toLowerCase()
          // console.log (userinputA)
        var userinputB = (answer.quantity).toLowerCase()
          // console.log (userinputB)
          if (userinputA === "q" || userinputB === "q") {
          console.log ("\n################################")
          console.log ("See ya later!")
          console.log ("##################################")
            questions ()
          }
          else {
            findItem(answer)
            } 
        })
     };

// ============== Checking if the store has enough items in stock ========== // 
    function findItem(answer){
        // console.log("\n +++ answer" , answer)    
      products.forEach(item => {
        // console.log ("helloo") 
        // console.log ("item.item_id", item.item_id)
        // console.log ("answer.item_id", answer.item_id)
          if (parseInt(item.item_id) === parseInt(answer.item_id)){
            // console.log ("helloo")
          processOrder(item, answer)
          }
        
        });
    };

// ============== Logical output based on item_id & quantity selected by customer =============== //
    function processOrder(item, answer){
      // console.log("\n ~~~ item" , item)
      // console.log("\n ~~~ answer" , answer)
    if (parseInt(item.stock_quantity) >= parseInt(answer.quantity)){
      var newQuantity = parseInt(item.stock_quantity) - parseInt(answer.quantity)
      connection.query('UPDATE products SET ? WHERE ?', [{stock_quantity: newQuantity}, {item_id: item.item_id}])
        console.log ("\n####################")
        console.log('Total Cost = ' + parseInt(item.price) * parseInt(answer.quantity))
        console.log ("##################################")

// =================== Ask customer if they would like to buy another item ====================== //
  // ========================= If yes run questions() ============================ //
  // =================== Else console.log("Thanks for shopping!") ======================== //
      inquirer.prompt([
        {
          name: "buy_again",
          type: "confirm",
          message: "Would you like to buy another item?"	
        }	
          
        ]).then(function(answer){
        // console.log(answer)
          if (answer.buy_again) {
          questions() 
          }
          else {
          console.log("Thanks for shopping!") 
          }
          })

        } else {
          console.log ("\n####################")
          console.log("Insufficient Quantity!");
          console.log ("################################")
          questions() 
        }
      };
      
module.exports = {
  displayItems
 }