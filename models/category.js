const mongoose = require("mongoose");
const schema = mongoose.Schema;

const categorySchema = new schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: [true, "category name is already exist"],
      minlength: [3, "too short"],
      maxlength: [50, "too long"],
    },
    slug: {
      type: String,
      unique: [true, " slug is already exist"],
      minlength: [2, "too short"],
      maxlength: [50, "too long"],
    },
    Image: {
      type: String,
      required: [true, "image is required"],
    },
  },
  { timestamps: true }
);
const category=mongose.model('category',categorySchema)
module.exports = category;
