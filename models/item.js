const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxLength: 25 },
  description: { type: String, maxLength: 50 },
  price: { type: Date, required: true },
  number_in_stock: { type: Date, required: true },
  category: { type: String, required: true },
  URL: { type: String, required: true },
});

// Virtual for item's description
ItemSchema.virtual("description").get(function () {
  // To avoid errors in cases where an item does not have a description
  // We want to make sure we handle the exception by returning an empty string for that case
  let desc = "";
  if (this.description == "") {
    desc = "";
  }

  return desc;
});

// Virtual for item's URL
ItemSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/item/${this._id}`;
});

// Export model
module.exports = mongoose.model("Item", ItemSchema);
