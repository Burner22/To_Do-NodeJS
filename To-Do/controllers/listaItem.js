const ListaItem = require('../models').ListaItem;
const Item = require('../models').Item;
const Lista = require('../models').Lista;

exports.listar = async function(req,res,next){
    let enlistadas = await ListaItem.findAll()
    let items = await Item.findAll()
    let listas = await Lista.findAll();
    let aux1 = new Set()

    listas.forEach(lista => {
        enlistadas.forEach(element => {
            if(element.id_lista == lista.id_lista){
                aux1.add(lista)
            }
        });
    });
    
    let llenas = Array.from(aux1)  //ARRAY DE LISTAS CON ITEMS   
      
    res.render('listaItem', {
        llenas: llenas,
        enlistadas: enlistadas, 
        items: items,
        listas: listas
    });
}

//req.flash('success_msg', 'Item agregado correctamente.');

exports.agregar = async function (req,res,next){
    let id_lista = req.body.id_lista
    let id_item = req.body.id_item
    let aver = await ListaItem.findAll({
        where:{
            id_lista: id_lista,
            id_item: id_item
        }
    })
    try{
        await ListaItem.create({
            id_lista: id_lista,
            id_item: id_item
        })
        req.flash('success_msg', 'El item se ha agregado correctamente');  
    }
    catch{
        req.flash('error_msg', 'La lista ya tiene el item'); 
    }
   
    res.redirect("/listaItem/mostrar")
}

exports.borrar = async function (req,res,next){
    let id_lista = req.body.id_lista
    let id_item = req.body.id_item
    console.log(`Se borra de la lista ${id_lista} el item ${id_item}`);
    await ListaItem.destroy({
        where:{
            id_lista: id_lista,
            id_item: id_item
        }
    }) 
    req.flash('success_msg', 'Su item ha sido eliminado');
    res.redirect("/listaItem/mostrar")   
}