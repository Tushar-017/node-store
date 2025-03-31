const Sequelize = require("sequelize")

const sequelize = new Sequelize("node-complete", "root", "Tea1965@z", {
  dialect: "mysql",
  host: "localhost",
  logging: console.log, // This will show SQL queries in console
})

module.exports = sequelize
