const Product = require("../models/product")

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body
  const product = new Product(null, title, imageUrl, price, description)
  product.save()
  res.redirect("/")
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect("/")
  }
  const prodId = req.params.productId
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/")
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: true,
      product: product,
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updateTitle = req.body.title
  const updatePrice = req.body.price
  const updateImageUrl = req.body.imageUrl
  const updateDesc = req.body.description
  const updateProduct = new Product(
    prodId,
    updateTitle,
    updateImageUrl,
    updatePrice,
    updateDesc
  )
  updateProduct.save()
  res.redirect("/admin/products")
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    })
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect("/admin/products")
}
