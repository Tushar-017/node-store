const path = require("path")
const express = require("express")

// const rootDir = require("../utils/path")
// rootDir will only be used in the file if we have a path.js file in the utils folder
const adminData = require("./admin")

const router = express.Router()

router.get("/", (req, res, next) => {
  const products = adminData.products
  // console.log(adminData.products)
  // res.sendFile(path.join(rootDir, "views", "shop.html"))
  // res.sendFile(path.join(__dirname, "../", "views", "shop.html"))
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProduct: products.length > 0,
  })
})

module.exports = router
