const User = require('../models').User;
const bcrypt = require("bcrypt");

// exports.login = async function (req,res,next){ 
//     res.render('login')
// }

// exports.registrarse = async function(req,res,nect){
//     if(req.body.usuario == "" && req.body.contraseña == ""){
//         req.flash('error', 'Ingrese un usuario y una contraseña');
//         res.redirect("/"); 
//     }
//     await User.create({
//         id_user: req.body.usuario,
//         password: req.body.password
//     })
//     req.flash('success_msg', 'Se ha registrado de manera exitosa');
//     res.redirect("/login");
// }

