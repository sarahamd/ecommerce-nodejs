const categoryModel = require("../models/category.js");
const slugify= require("slugify")
exports.getCategory = (req, res) => {
  const name = req.body.name;
  const newCategory = new categoryModel({ name });
  newCategory
    .save()
    .then((category) => {
      res.json(category);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.createCategory = (req, res) => {
    const name = req.body.name;
    // install slugify
    categoryModel.create({name,slug:slugify(name)}).then(category=>res.status(201).json({data:category})).catch((err)=>{
        console.log(err)
    })
};
