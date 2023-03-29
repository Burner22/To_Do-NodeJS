var express = require("express");
var router = express.Router();
const User = require("../models").User;
var passport = require("passport");
const bcrypt = require("bcrypt");

/* GET home page. */
router.get("/login",(req,res)=>{
    res.render("login")
})
router.post("/login",passport.authenticate("local",{
    successRedirect: "/item/mostrar",
    failureRedirect: "/auth/login"
}))

router.get("/logout", async (req,res)=>{    
    req.logout(function(err) {
        if (err) { return next(err) }
            req.flash('success_msg', 'Sesion cerrada');
            res.redirect("/auth/login")
    })       
})

router.post("/signup", async (req,res)=>{
    if (!(req.body.username && req.body.password)) {
        req.flash("error_msg", "Tiene que completar los campos")
    }
    else{
        let valida = await User.findAll({
            where: {
                id_user: req.body.username
            }
        })
        console.log(valida.length);
        if(valida.length == 1){
            req.flash('error_msg', 'Usuario ya existe');
            res.redirect("/auth/login") 
        }
        else{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            await User.create({
                id_user: req.body.username,
                password: req.body.password
            })
            req.flash('success_msg', 'Registrado');
            res.redirect("/auth/login") 
        }        
    }
})



// router.get("/github", passport.authenticate("github"));

// router.get("/facebook", passport.authenticate("facebook"));

// router.get("/callback",passport.authenticate("facebook", {
//     successRedirect: "/item/mostrar",
//     failureRedirect: "/auth",
//   })
// );

// router.get("/callback",passport.authenticate("github", {
//     successRedirect: "/item/mostrar",
//     failureRedirect: "/auth",
//   })
// );

module.exports = router;
