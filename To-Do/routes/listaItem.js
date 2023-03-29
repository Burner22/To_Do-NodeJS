var express = require('express');
var router = express.Router();
const listaItem = require("../controllers/listaItem");

/* GET users listing. */
router.get('/mostrar', (req, res,next)=> listaItem.listar(req, res,next));
router.post('/agregar', (req, res,next)=> listaItem.agregar(req, res,next));
router.delete('/borrar', (req, res,next)=> listaItem.borrar(req, res,next));



module.exports = router;