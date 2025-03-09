const Sequelize = require("sequelize")

const sequelize = new Sequelize("node-complete", "root", "Tea1965@z", {
  dialect: "mysql",
  host: "localhost",
})

module.exports = sequelize
