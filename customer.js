var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database : 'bamazon'
});

connection.connect(function(err){
    if(err) throw err;
    
    console.log('----------------------------------------')
    console.log('Connected as ID#: ' + connection.threadId);
    console.log('--------  Welcome to Bamazon!!  --------')
    
    connection.query('SELECT * FROM products', function(err, res){
        if (err) throw err;
    
    console.log(res)
        
        var allProducts = res;
        
        beginPrompt();
        function beginPrompt() {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'id',
                    message: 'Please provide the ID of the product you would like to purchase:'
                },
                {
                    type: 'input',
                    name: 'amount',
                    message: 'How many units of the product would you like to purchase?'
                }]).then(function(user){
                    var itemID = user.id;
                    var quantitySelected = user.amount;
                    
                    // console.log("Item ID: " + itemID);
                    // console.log("Item Qty: " + quantitySelected)
                    // console.log("All Products", allProducts);
            
                    var itemSelected;
                    
                    for (var i = 0; i < allProducts.length; i++) {
                       // console.log(allProducts[i].id);
                        if (itemID == allProducts[i].id) {
                            itemSelected = allProducts[i];
                            break;
                        }
                    }
                    
                    console.log("Selected Item before purchase: ", itemSelected);
                    
                    if (quantitySelected > itemSelected.quantity) {
                        console.log('Insufficient quantity, cannont complete order!')
                        tryAgain();
                    } else {
                        var totalOwed = itemSelected.price * quantitySelected;
                        connection.query(
                            'UPDATE products SET ? WHERE ?', 
                            [
                                {
                                    quantity:  itemSelected.quantity - quantitySelected
                                },
                                {
                                    id: itemID
                                }
                            ], function (err, res){
                                if (err) throw err;
                                console.log('Order has been placed!');
                                console.log('You owe: $', totalOwed);
                                connection.end();
                            });
                        }
                    });
                }
            });
            
        });
        
        function tryAgain() {
            inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirmed',
                    message: 'Would you like to try placing another order?'
                }]).then(function(user){
                    if (user.confirmed){
                        beginPrompt();
                    } else {
                        console.log('--- Goodbye ---')
                        connection.end();
                    }
                })  
            };
