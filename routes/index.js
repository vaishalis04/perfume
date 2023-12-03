var express = require('express');
var router = express.Router();
const fs = require("fs");
const bodyParser = require('body-parser');


function Perfumes() {
  return JSON.parse(fs.readFileSync("public/perfume.json", "utf-8"));
}
function write(x){

  fs.writeFileSync("public/perfume.json", JSON.stringify(x));
}
function Login() {
  return JSON.parse(fs.readFileSync("public/data.json", "utf-8"));
}
// function writing(v){

//   fs.writeFileSync("public/data.json", JSON.stringify(v));
// }

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

router.get('/perfume', function(req, res, next) {
  res.render('allperfume',  {  perfumes: Perfumes()  });
});
router.get('/gifting', function(req, res, next) {
  res.render('gifting', { title: 'Express' });
});
router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Express' });
});


router.post('/registration', function(req, res, next) {
const x = Perfumes();
  x.push(req.body);
  write(x)
  res.redirect("/welcome");
});


router.get('/welcome', function(req, res, next) {
  res.render('welcome', { perfumes: Perfumes() });
});


router.post('/registration', function(req, res, next) {
  const x = Perfumes();
  x.push(req.body);
  fs.writeFileSync("public/perfume.json", JSON.stringify(x));
  res.redirect("/perfume")});


router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'Express' });
  });
  router.get('/service', function(req, res, next) {
    res.render('service', { title: 'Express' });
  });
  router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Express' });
  });
  let cart = [];
  router.get('/cart', function(req, res, next) {
    res.render('cart', { perfumes: Perfumes(), carts: [] });
  });
  router.post('/cart', (req, res) => {
    const perfumeId = parseInt(req.body.perfumeId);
    const perfume = Perfumes().find(item => item.id === perfumeId);
  
    if (perfume) {
      cart.push(perfume);
    }
  
    res.redirect('/cart');
  });
router.get("/delete/:idx", function (req, res, next) {
let x = Perfumes();
x.splice(req.params.idx,1);
fs.writeFileSync("public/perfume.json",JSON.stringify(x))
    res.redirect("/welcome");
  });
  router.post('/update/:idx', function(req, res, next) {
    const x = Perfumes()
    x[req.params.idx]=req.body
   write(x)
    res.redirect("/welcome")  
  });
  router.get('/update/:idx', function(req, res, next) {
    const x = Perfumes()
    res.render("update",{data: x[req.params.idx] , index: req.params.idx})  
  });
  router.get('/buy', function(req, res, next) {
    res.render('buy',{ perfumes: Perfumes() });
  });
  router.get('/signup', function(req, res, next) {
 res.render('signup',{ title: 'Express' });
  });
  router.post('/signup', function(req, res, next) {
    const v = Login();
      v.push(req.body);
      // writing(v)
  fs.writeFileSync("public/data.json", JSON.stringify(v));

      res.redirect("/signin");
    });
  router.get('/signin', function(req, res, next) {
    res.render('signin',{ logins: Login() });
     });
     router.post('/signin', function(req, res, next) {
      res.redirect('/perfume',{ logins: Login() });
       });
module.exports = router;

