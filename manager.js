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
        
        //console.log(res)
        
        var allProducts = res;
        
        managerSelect();
        function managerSelect() {
            inquirer.prompt([{
                type: "list",
                name: "option",
                message: "Please select one of the following options:",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product",
                    "Disconnect"
                ]
            }]).then(function(user) {
                switch(user.option) {
                    case "View Products for Sale":
                    viewProducts();
                    break;
                    case "View Low Inventory":
                    viewLow();
                    break;
                    case "Add to Inventory":
                    addTo();
                    break;
                    case "Add New Product":
                    addNew();
                    break;
                    case "Disconnect":
                    disconnect();
                    break;
                }
            });
        }
        
        // ----------------------------------------------------------------
        // ----------------------------------------------------------------
        function viewProducts() {
            console.log(allProducts)
            connection.end();
        };
        
        // ----------------------------------------------------------------
        // ----------------------------------------------------------------
        function viewLow() {
            var lowInven;
            var lowInvenQ;
            
            for (var i = 0; i < allProducts.length; i++) {
                if (allProducts[i].quantity <= 15) {
                    lowInven = allProducts[i].product_name;
                    lowInvenQ = allProducts[i].quantity;
                    console.log("There are " + lowInvenQ + " " + lowInven + "'s remaining!"); 
                    //Add inquirer requesting to add new 
                    inquirer.prompt([{
                        type: "confirm",
                        name: "lowInventory",
                        message: "Would you like to add more?"
                    }]).then(function(response) { 
                        addTo();
                    }) 
                }
            }
        };
        
        // ----------------------------------------------------------------
        // ----------------------------------------------------------------
        function addTo() {
            
            for (var i = 0; i < allProducts.length; i++) {
                console.log("ID: " + allProducts[i].id + " Product: " + allProducts[i].product_name);
            }
            
            inquirer.prompt([{
                type: "input",
                name: "id",
                message: "Please provide the ID number of the product you would like to add more of:"
            }, {
                type: "input",
                name: "amount",
                message: "How many would you like to add?",
            }]).then(function(manager){
                
                var itemID = manager.id;
                var quantitySelected = manager.amount;
                
                //console.log("Item ID: " + itemID);
                //console.log("Amount to be Added to Inventory: " + quantitySelected);
                
                var itemSelected;
                
                for (var i = 0; i < allProducts.length; i++) {
                    if (itemID == allProducts[i].id) {
                        itemSelected = allProducts[i];
                        break;
                    }
                }
                
                console.log("Selected Item: ", itemSelected);
                
                if (itemSelected.id == itemID) {
                    //console.log(itemSelected.id)
                    //console.log(itemID)
                    
                    var newQty = parseInt(itemSelected.quantity) + parseInt(quantitySelected);
                    
                    console.log("New Quantity: " + newQty)
                    
                    connection.query(
                        'UPDATE products SET ? WHERE ?',
                        [
                            {
                                quantity: newQty
                            },
                            {
                                id: itemID
                            }
                        ],
                        function(err, res) {
                            if (err) throw err;
                            console.log('Item has been restocked!');
                            connection.end();
                        })
                    } else {
                        console.log("Error!")
                    }
                })
            }
            
            // ----------------------------------------------------------------
            // ----------------------------------------------------------------
            
            function addNew() {
                
                console.log("Here are the items currently available for purchase:")
                for (var i = 0; i < allProducts.length; i++) {
                    console.log("ID: " + allProducts[i].id + " Product: " + allProducts[i].product_name);
                }
                
                inquirer.prompt([{
                    type: "input",
                    name: "new",
                    message: "Name of the product you would like to add?"
                }, {
                    type: "input",
                    name: "dept",
                    message: "In which department will the item be stored?",
                }, {
                    type: "input",
                    name: "price",
                    message: "Price of the item:",
                }, {
                    type: "input",
                    name: "amount",
                    message: "How many units of this product would you like to add to the inventory?",
                }]).then(function(manager){
                    
                    var productNew = manager.new;
                    var departmentNew = manager.dept;
                    var priceNew = manager.price;
                    var qtyNew = manager.amount;
                    
                    console.log("-----------------------------")
                    console.log("Product: " + productNew);
                    console.log("Department: " + departmentNew);
                    console.log("Price: " + priceNew);
                    console.log("Quantity: " + qtyNew);
                    console.log("-----------------------------")
                    
                    connection.query(
                        'INSERT INTO products SET ?', 
                        [{
                            product_name: productNew,
                            department_name: departmentNew,
                            price: priceNew,
                            quantity: qtyNew
                            
                        }], function(err, res) {
                            if (err) throw err;
                            console.log('Item has been added to the database!');
                            connection.end();
                        })
                    })
                }
                
                // ----------------------------------------------------------------
                // ----------------------------------------------------------------
                function disconnect() {
                    console.log("Goodbye!")
                    connection.end();
                }
                // ----------------------------------------------------------------
            })
        })
        