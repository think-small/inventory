const { DataTypes } = require("sequelize");
const connection = require("../Data/sequelizeConnection");
const Instrument = require("./Instrument");
const Item = require("./Item");
const Transaction = require("./Transaction");

const models = {};
models.Instrument = Instrument(connection, DataTypes);
models.Item = Item(connection, DataTypes);
models.Transaction = Transaction(connection, DataTypes);

connection.sync({ force: true })
    .then(() => console.log("Dropped and synced MySQL tables"))
    .catch(err => console.error(err));

module.exports = models;