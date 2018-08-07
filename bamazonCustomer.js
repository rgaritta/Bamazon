var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');

var id;
var curQuantity;
var total;
var price;

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: 'root',
    database: 'bamazon'
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log('connected as id ' + connection.threadID);
    displayProducts();
})

function displayProducts() {
    connection.query("SELECT products.item_id, products.product_name, products.department_name, products.price, products.stock_quantity FROM products", function (err, res) {
        if (err) throw err;
        console.log('--------------------------------------------------------------');
        console.table(res);
        getInput();
    });
}

function getInput() {
    inquirer.prompt([
        {
            name: "id",
            message: "Enter the ID of a product you want to purchase:"
        },
        {
            name: "quantity",
            message: "How many:"
        }
    ]).then(function (response) {
        id = response.id;
        curQuantity = response.quantity;
        //console.log("ID: " + id);
        connection.query("SELECT * FROM products WHERE ?",
            {
                item_id: id
            },

            function (err, res) {
                if (err) throw err;

                if (curQuantity <= res[0].stock_quantity) {
                    item = res[0].product_name;
                    price = res[0].price;
                    var newQuantity = res[0].stock_quantity - curQuantity;
                    total = res[0].price * curQuantity;
                    fulfillOrder(item, curQuantity, total);
                    updateDatabase(newQuantity);
                }
                else if (curQuantity > res[0].stock_quantity) {
                    console.log('--------------------------------------------------------------');
                    console.log("We don't have that many in stock.")
                    setTimeout(displayProducts, 1000)
                }

            })
    })

}

function fulfillOrder(item, newQuantity, total) {
    console.log('--------------------------------------------------------------');
    console.log('You purchased ' + newQuantity + ' of item "' + item + '." The total cost is: $' + total);
}

function updateDatabase(newQuantity) {
    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newQuantity,
            },
            {
                item_id: id
            }
        ], function (err, res) {
        }
    )
    setTimeout(displayProducts, 1000)
}
