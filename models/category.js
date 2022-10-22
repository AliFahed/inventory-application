const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, minLenght: 3, maxLength: 25 },
  description: { type: String, maxLength: 50 },
  URL: { type: String, required: true },
});

// Virtual for item's description
CategorySchema.virtual("description").get(function () {
  // To avoid errors in cases where an category does not have a description
  // We want to make sure we handle the exception by returning an empty string for that case
  let desc = "";
  if (this.description == "") {
    desc = "";
  }

  return desc;
});

// Virtual for category's URL
CategorySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/category/${this._id}`;
});

// Export model
module.exports = mongoose.model("Category", CategorySchema);
