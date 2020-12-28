const mysql = require('mysql');
const Sequelize = require("sequelize");

//make the connection to the database
const database = process.env.NODE_ENV === "test" ? "InventoryTest" : "Inventory";

const connection = new Sequelize(`${database}`, 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889,
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

connection.authenticate()
    .then(() => console.log('Successfully connected to MySQL with Sequelize'))
    .catch(err => console.log("Connection to MySQL with Sequelize failed: ", err))

module.exports = connection; 