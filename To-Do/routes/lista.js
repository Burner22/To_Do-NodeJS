var express = require('express');
var router = express.Router();
const lista = require("../controllers/lista");

/* GET users listing. */
router.get('/mostrar', (req, res,next)=> lista.listar(req, res,next));
router.post('/agregar', (req, res,next)=> lista.agregar(req, res,next));
router.put('/actualizar', (req, res,next)=> lista.actualizar(req, res,next));
router.delete('/borrar', (req, res,next)=> lista.borrar(req, res,next));

module.exports = router;