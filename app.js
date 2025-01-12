const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
// const expressHbs = require("express-handlebars")

const app = express()

// app.engine(
//   "hbs",
//   expressHbs({
//     layoutDir: "views/layouts/",
//     defaultLayout: "main-layout",
//     extname: "hbs",
//   })
// )
// app.set("view engine", "pug")
// app.set("view engine", "hbs")
app.set("view engine", "ejs")
app.set("views", "views")

const adminData = require("./routes/admin")
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
// express will check if any request is asking for the static file it will directly target the public folder
// static middleware...there can be more than one static middle ware
app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminData.routes)
app.use(shopRoutes)

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" })
})

app.listen(3000)

// module.exports = path.dirname(process.mainModule.filename)
// module.exports = path.dirname(require.main.filename)
