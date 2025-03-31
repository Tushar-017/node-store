const express = require("express")
const path = require("path")

const bodyParser = require("body-parser")
const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const errorController = require("./controllers/error")

const sequelize = require("./utils/database")
const Product = require("./models/product")
const User = require("./models/user")
const Cart = require("./models/cart")
const CartItem = require("./models/cart-item")
const Order = require("./models/order")
const OrderItem = require("./models/order-item")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({ extended: false }))
// express will check if any request is asking for the static file it will directly target the public folder
// static middleware...there can be more than one static middle ware
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => console.log(err))
})

app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

// Define associations
// This defines the relationship between Product and User models
// A Product belongs to one User (many-to-one). If User is deleted, their Products are also deleted (CASCADE)
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" })

// A User can have many Products (one-to-many)
User.hasMany(Product)

// A User can have one Cart (one-to-one)
User.hasOne(Cart)

// A Cart belongs to one User (one-to-one)
Cart.belongsTo(User)

// Many-to-many relationship between Cart and Product through CartItem model
// A Cart can have many Products and a Product can be in many Carts
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })

// Normal sync without force
sequelize
  .sync()
  // .sync({ force: true })
  .then(() => User.findByPk(1))
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@test.com" })
    }
    return user
  })
  .then((user) => {
    return user.createCart()
  })
  .then((user) => {
    // console.log(user)
    app.listen(3000, () => {
      console.log("Server is running on port 3000")
    })
  })
  .catch((err) => {
    console.log(err)
  })

// module.exports = path.dirname(process.mainModule.filename)
// module.exports = path.dirname(require.main.filename)
