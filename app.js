const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

// const User = require("./models/user")

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
// express will check if any request is asking for the static file it will directly target the public folder
// static middleware...there can be more than one static middle ware
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   User.findById("67f2c6f5c5d6f6f3353d6f7c")
//     .then((user) => {
//       req.user = new User(user.name, user.email, user.cart, user._id)
//       next()
//     })
//     .catch((err) => console.log(err))
// })

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect(() => {
//   app.listen(3000)
// })

mongoose
  .connect(
    "mongodb+srv://tusharN2025:Lnkm7C36q2gcN3QR@cluster0.mzcrxxm.mongodb.net/shopMongoos?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
