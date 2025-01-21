const mongoose =require("mongoose")

const Schema=mongoose.Schema
 
// new instance from Schema
const articlesShema = new Schema({
title:String,
subtitle:String
})

// model take two parameters name row in db and schema
module.exports=mongoose.model("Article",articlesShema)

