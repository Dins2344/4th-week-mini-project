var express = require("express");
const session = require("express-session");
var router = express.Router();

let username = "dinson.cd@gmail.com";
let password = "2344";
let err=false

/* GET home page. */
router.get("/", function (req, res) {
  if(req.session.user){
    res.redirect('/home')
  }
  else if (err){
    res.render('index',{error : "invalid user id or password"})
    err= false
  }
  else{
    
    res.render("index");
  }
  
});

router.get('/home',(req, res)=>{
  let products = [
  { brand: "apple", model: "i phone 14", price: "RS 110000", image:"https://m.media-amazon.com/images/I/71ZDY57yTQL._SX522_.jpg" },
  { brand: "samsung", model: "s22 ultra", price: "RS 95000",image:"https://m.media-amazon.com/images/I/71PvHfU+pwL._SL1500_.jpg"},
  { brand: "one plus", model: "10 pro", price: "RS 71000",image:"https://m.media-amazon.com/images/I/618hqM-yxtL._SL1500_.jpg" },
  { brand: "sony", model: "Xperia 1", price: "RS 154000",image: "https://m.media-amazon.com/images/I/71KzVVEk6VL.jpg"},
  { brand: "Xiaomi", model: "12 pro", price: "RS 59000",image: "https://m.media-amazon.com/images/I/71vNgTH3MzL._SX679_.jpg"},
  { brand: "huawei", model: "P50 pro", price: "RS 74000",image: "https://m.media-amazon.com/images/I/51M0gplIVFL._SX425_.jpg"},
  
];
  if(req.session.user){
    res.render('home', {products});
  }
  else{
    res.redirect('/');
  }
})




router.post("/submit", function (req, res) {
  console.log(req.body.username, req.body.password);
  if ((req.body.username == username && req.body.password == password)) {
    req.session.user = req.body.username
    console.log(req.session)
    res.redirect("home"); 
  } else {
    err = true
    res.redirect('/')
  }
});

router.get("/logout",function(req,res){
  req.session.destroy()
  res.redirect("/")
})

module.exports = router;
