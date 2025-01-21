//*  import express (framework)
const express = require("express");

//*   invoke express to can acesss all method in express
const app = express();

//* get request
app.get("/profile", (req, res) => {
  // response (front-end will see it when take this path("/profile"))
  res.send("Welcome to profile page");
});

//? ------------------------------
// ! dont forget install nodemon if you dont install your sever will take screenshot after write listen port
// so he cant see anything i will write after listen if i wanna made it see all i write so you have two ways
// 1. restart server
// or
// 2. use nodemon (so you dont need to restart server its best way)
//? -----------------------------------------

//TODO----------- take params(pathparameters , bodyparamaters , queryparamters)

///   ?  -----------  pathparameters ----------------


app.get("/profile/:id", (req, res) => {
  const id = req.params.id;
  // ------ response (front-end will see it when take this path)
  res.send(`Welcome to profile page ${id}`);
});

///  ? -----------     bodyparamaters ----------------

//*The express.json() function is a built-in middleware in Express that is used for parsing incoming requests with JSON payload.
// * The express.json middleware is important for parsing incoming JSON payloads and making that data available in the
//! req.body or further processing within the routes. Without using express.json,
// * Express will not automatically parse the JSON data in the request body.
//* By using the express.json middleware, you can handle POST, PUT, or PATCH requests that send JSON data from the client to the server.

// const express =require("express");
// const app =express()

app.use(express.json());
app.get("/name", (req, res) => {
  console.log(req.body);
  //  {key:value}=> { name: 'sara' }
  res.send(`name is ${req.body.name}`);
});



///  ? -----------     QueryParametars ---------------

app.get("/anyhing", (req, res) => {
  console.log(req.query); 
  //  {key:value}=> { page: '50' }
  res.send(`numPage is ${req.query.page}`);
});

//----   response paramater-----------------------------------------
// request => domain?page=50 ==> response {page:50}
app.get("/anyhing", (req, res) => {
  console.log(req.query); 
  res.json({   
      page:req.query.page,  // { page: '50' }
      Language:"Arabic",
    })  //send object to front

    res.send("<h1>hello</h1>")
    res.sendFile(__dirname+"/file.html") 
    //if i write in file.html <h1>welcome</h1> i will git welcome  
});
// ------------------------------
// ejs template engine (write html and js with connect with sever) 
// suppose install package ejs ,suppose file with extenstion ejs in folder name veiws
app.get("/home",(req,res)=>{
  res.render("home.ejs")
})
//?---------------- connect mongodb----------
// 1-insall mongoose
// 2-import mongoose 
// const mongoose = require("mongoose");
// connect with db and will return promise
// mongoose.connect("mongodb://localhost:27017/myDB").then(()=>{
//   console.log("connected to db");
// }).catch(()=>{
//   console.log("not connected to db");
// })
// FYI: atlas is host to mongodb
//* ////////////////////
const articles=require("./models/Articles")
app.post("/articles",async(req,res) =>{
const newArticle= new articles()
const artTitle=req.body.articleTitle
const artBody=req.body.articleBody
// dont forget await to save in db
await newArticle.save()
res.json(newArticle)
})

app.get("/articles",async(req,res) =>{
  const articles= await articles.find()
  res.json(articles)

})
app.get("/articles/:id",async(req,res) =>{
  const article= await articles.findById(req.params.id)
  res.json(article )

})
// -------------------config.env--------------------------
const dotenv=require("dotenv")
dotenv.config({path:"config.env"}) 
const port=process.env.PORT
// -------------------Middleware--------------------------
// logger http requ (morgan package)
// middleware thing between req and res
// (logging-userAuth-json parsing-static files-app routing)
// npm i morgan
const morgan = require("morgan")
// in development mode
if(process.env.NODE_ENV= 'development'){
  app.use(morgan("dev"))
}
// ------------------------------------
//! listen for any port or can listen for domain name
app.listen("3000", () => {
  console.log("server is running on port 3000");
});
