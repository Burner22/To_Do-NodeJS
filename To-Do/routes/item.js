var express = require('express');
var router = express.Router();
const item = require("../controllers/item");

/* GET users listing. */
router.get('/mostrar', (req, res,next)=> item.listar(req, res,next));
router.post('/agregar', (req, res,next)=> item.agregar(req, res,next));
router.put('/actualizar', (req, res,next)=> item.actualizar(req, res,next));
router.delete('/borrar', (req, res,next)=> item.borrar(req, res,next));

module.exports = router;