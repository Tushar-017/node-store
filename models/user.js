const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  if (!product || !product._id) {
    throw new Error("Invalid product provided to addToCart");
  }

  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId && cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updateCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updateCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updateCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updateCart = {
    items: updateCartItems,
  };
  this.cart = updateCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId && item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId && item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const ObjectId = mongodb.ObjectId

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username
//     this.email = email
//     this.cart = cart
//     this._id = id
//   }

//   save() {
//     const db = getDb()
//     return db.collection("users").insertOne(this)
//   }

//   addToCart(product) {
//     if (!product || !product._id) {
//       throw new Error("Invalid product provided to addToCart")
//     }

//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId && cp.productId.toString() === product._id.toString()
//     })
//     let newQuantity = 1
//     const updateCartItems = [...this.cart.items]

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1
//       updateCartItems[cartProductIndex].quantity = newQuantity
//     } else {
//       updateCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity,
//       })
//     }

//     const updateCart = {
//       items: updateCartItems,
//     }
//     const db = getDb()
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: updateCart } }
//       )
//   }

//   getCart() {
//     const db = getDb()
//     const productIds = this.cart.items.map((i) => {
//       return i.productId
//     })
//     // for future can improve this logic to cleanup the not found items in cart.
//     return db
//       .collection("products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find((i) => {
//               return i.productId && i.productId.toString() === p._id.toString()
//             }).quantity,
//           }
//         })
//       })
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter((item) => {
//       return (
//         item.productId && item.productId.toString() !== productId.toString()
//       )
//     })
//     const db = getDb()
//     return db
//       .collection("users")
//       .updateOne(
//         { _id: new ObjectId(this._id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       )
//   }

//   addOrder() {
//     const db = getDb()
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this._id),
//             name: this.name,
//           },
//         }
//         return db.collection("orders").insertOne(order)
//       })
//       .then((result) => {
//         this.cart = { item: [] }
//         return db
//           .collection("users")
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           )
//       })
//   }

//   getOrders() {
//     const db = getDb()
//     return db
//       .collection("orders")
//       .find({ "user._id": new ObjectId(this._id) })
//       .toArray()
//   }

//   static findById(userId) {
//     const db = getDb()
//     // return db.collection("users").findOne({_id: new ObjectId(userId)})
//     return db
//       .collection("users")
//       .findOne({ _id: new ObjectId(userId) })
//       .then((user) => {
//         console.log(user)
//         return user
//       })
//       .catch((err) => console.log(err))
//   }
// }

// module.exports = User
