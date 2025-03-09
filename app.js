const express = require("express")
const path = require("path")

const bodyParser = require("body-parser")
const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")
const errorController = require("./controllers/error")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

app.use(bodyParser.urlencoded({ extended: false }))
// express will check if any request is asking for the static file it will directly target the public folder
// static middleware...there can be more than one static middle ware
app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})

// module.exports = path.dirname(process.mainModule.filename)
// module.exports = path.dirname(require.main.filename)
