const mongoose = require("mongoose");

const Cart = require("../Modals/Cart");
const Product = require("../Modals/Product");

const getAllItemsFromCart = async (req, res, next) => {
  try {
    const cartItems = await Cart.find({});
    if (cartItems.length === 0) {
      res.status(400).json("No items in the cart.");
    } else {
      res.status(200).json(cartItems);
    }
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const createCartItem = async (req, res, next) => {
  try {
    const {
      productId,
      brand,
      color,
      price,
      pickedQty,
      features,
      image,
    } = req.body;

    const existingCartItem = await Cart.findOne({ productId });
    if (existingCartItem) {
      res.status(400).json("This items already exists in the cart");
    } else {
      const cartItem = await Cart.create({
        productId,
        brand,
        color,
        price,
        pickedQty,
        features,
        image,
      });
      res.send(cartItem);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { type } = req.body;
    const { cartItemId } = req.params;
    const cartItem = await Cart.findById(cartItemId);
    cartItem.pickedQty =
      type === "add" ? cartItem.pickedQty + 1 : cartItem.pickedQty - 1;
    await cartItem.save();
    const cartItems = await Cart.find({});
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteCartItem = async (req, res, next) => {
  try {
    const cartItemId = req.params.cartItemId;
    await Cart.findByIdAndDelete(cartItemId);
    const cartItemsAfterDeleted = await Cart.find({});
    res.status(200).json(cartItemsAfterDeleted);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getAllItemsFromCart = getAllItemsFromCart;
exports.createCartItem = createCartItem;
exports.updateCartItem = updateCartItem;
exports.deleteCartItem = deleteCartItem;