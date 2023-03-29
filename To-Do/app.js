const morgan = require("morgan");
const path = require("path");
const express = require(`express`);
const flash = require("connect-flash");
var methodOverride = require("method-override");
const bcrypt = require("bcrypt");
var createError = require('http-errors');
const sequelize = require('./models/index').sequelize;
var User = require("./models").User;
var cookieParser = require("cookie-parser");
const expressSession = require("express-session");
var GithubStrategy = require("passport-github2").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy
//Router
const index = require("./routes/index");
const itemRouter = require("./routes/item");
const listaRouter = require("./routes/lista");
const listaItemRouter = require("./routes/listaItem");
const userRouter = require("./routes/user");

const app = express();

//Settings
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//MiddleWares
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(
    `ruta recibida: ${req.protocol}://${req.get(`host`)}${req.originalUrl}`
  );
  next();
});


//Authenticate
app.use(cookieParser());
app.use(expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 365 * 1000
      }
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async function(username,password,done){
  let user = await User.findOne({
    where: {
      id_user: username
    }
  });
  
  if(user != null){
    const validPassword = await bcrypt.compare(password, user.dataValues.password);

    if (username == user.dataValues.id_user && validPassword){
      return done(null, {username: user.dataValues.id_user,password: user.dataValues.password})
    } 
    else{
      done(null,false) 
    }
  }
  else{
    done(null, false)
  }
  // if(username == "burner" && password == "41710461"){
  //   return done(null,{username: "burner",password:"41710461"})
  // }
}))


passport.serializeUser(function (user, done) {
  done(null, user.username);
});
passport.deserializeUser(async function (id, done) {
  let user = await User.findOne({
    where: {
      id_user: id
    }
  });
  if(user == null){
    done(null, false)
  }
  else{
    done(null, {id: user.id_user,password:user.password});
  }
});

// passport.use(
//   new GithubStrategy({
//     clientID: "4691d6ea424f2bd8e5f6",
//     clientSecret: "94688981b4b5a7deb967e764a8f868493f05cca4",
//     callbackURL: "http://localhost:8888/auth/callback"
//   },
//   function(accesToken, refreshToken, profile, cb){
//     console.log("La poronga esta andando");
//     console.log(profile);
//   }
//   )
// )

// passport.use(
//   "facebook",
//   new FacebookStrategy(
//     {
//       clientID: "1800710600298093",
//       clientSecret: "b2e56a066bb1c0eb3974e321fa5606e6",
//       callbackURL: "http://localhost:8888/auth/callback",
//     },

//     // facebook will send back the tokens and profile
//     function (access_token, refresh_token, profile, done) {
//       User.findOrCreate({
//         where: {id_user: profile.emails[0].value, password: profile.id},
//       }).then((usuario, creado)=>{
//         console.log(usuario);
//         return done(null,usuario)
//       })
//     }
//   )
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });
// passport.deserializeUser(function (user, done) {
//   done(null, user);
// });

// Global
app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  next();
});

const autenticar = (req, res, next) => {
  if (req.user) return next();
  else{ 
    req.flash("error_msg","Debe iniciar sesion")
    res.redirect("/auth/login");
  }
};

//rutas
app.use("/", index);
app.use("/auth", userRouter);
app.use("/item", autenticar, itemRouter);
app.use("/lista", autenticar, listaRouter);
app.use("/listaItem", autenticar, listaItemRouter);



//Manejo de 404p
app.use(function (req, res, next) {
    next(createError(404))
});

//Error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  req.flash("error_msg","Se ha producido un error")
  res.render("login")
});

//Archivos publicos y estaticos
app.use(express.static(path.join(__dirname, "views")));

//Levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`La app ha arrancado en https://localhost:${port}`);
  sequelize.sync()
});

module.exports = app;

//sequelize model:create --name Jobs --attributes