const mongoose = require("mongoose");

const PurchasedCardSchema = new mongoose.Schema({
  card_name: {
    type: String,
    required: true,
  },
  card_price: {
    type: Number,
    required: true,
  },
  card_image: {
    type: String,
    required: true,
  },
  card_description: {
    type: String,
    required: true,
  },
  purchase_date: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postal_code: {
    type: String,
    default: "",
  },
  phone_number: {
    type: String,
    required: true,
  },
  delivery_notes: {
    type: String,
    default: "",
  },
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "Visitor",
  },
  purchased_cards: [PurchasedCardSchema],
  shopping_cart: [
    {
      card_type: {
        type: String,
        enum: ["Card", "Package"],
        required: true,
      },
      card_name: {
        type: String,
        required: true,
      },
      card_price: {
        type: Number,
        required: true,
      },
      card_image: {
        type: String,
        required: true,
      },
      card_description: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
});

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
