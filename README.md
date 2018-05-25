# CLI-Storefront (Bamazon)

Bamazon, is an Amazon-like storefront. 

### Overview
Bamazon is a command line based storefront using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the npm [MySQL](https://www.npmjs.com/package/mysql) package together with the MySQL database backend presenting two interfaces customer.js and manager.js. 


## Customer.js

The customer interface allows the user to view the current inventory of items available for purchase.
The customer will be provided with the following information for each item: 
* item ID
* description
* department in which the item is located
* price
* quantity 

The customer is then able to purchase one of the existing items by entering the item ID and desired quantity. If the selected quantity is in stock, the order is processed displaying the total amount owed and the store's database is updated accordingly. If the desired quantity is not available, the user is prompted to modify their order. 

### Sufficient quantity
![Alt text](images/customer.jpg 'C')
### Insufficient quantity 
![Alt text](images/0.png 'C1')


## Manager.js

The manager interface prompts the user with a list of five options:

	? Please select an option: (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product        ...and, Disconnect
   
 
- **View Products for Sale**: allows the user to view the inventory available for purchase.
- **View Low Inventory** shows the user which items have less than 15 units in stock; the user is then prompted, giving the user the option to add more units of that product to the inventory. The database is then updated accordingly. 
- **Add to Inventory**: allows the user to select a product by item ID and add more units of the product to the inventory; the database is then updated accordingly.
- **Add New Product**: allows the user to add a new product to the store; user is then prompted to include the following details of the item to be added to the database:  
	* item ID
	* description 
	* department in which item is located 
	* price 
	* quantity
- **Disconnect**: ends current session


### Options
![Alt text](images/1.png 'M')
### View low
![Alt text](images/2.png 'M1')
### Add to
![Alt text](images/3.png 'M2')
### New product
![Alt text](images/4.png 'M3')

