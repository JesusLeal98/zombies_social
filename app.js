var express= require("express");
var mongoose= require("mongoose");

var path= require("path");
var bodyParser= require("body-parser");
var cookieParser= require("cookie-parser");
var flash= require("connect-flash");
var session=require("express-session");
var passport = require("passport");

var routes= require("./routes");
var app= express();
var passportsetup = require("./passportsetup");

mongoose.connect("mongodb://JesusLeal:#Soyel89@ds259711.mlab.com:59711/zombie_nest_la");

passportsetup();

app.set("port",process.env.PORT||3000);
//direccion donde estan las rutas
app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"TKRvTKR",
    resave: true,
    saveUninitialized:true

}));
app.use(flash());

app.use(passport.initialize({
    userProperty:"zombie"
}));
app.use(passport.session());

app.use(routes);
app.listen(app.get("port"),()=>{
    console.log("la aplicacion inicio por el puerto"+app.get("port"));
})