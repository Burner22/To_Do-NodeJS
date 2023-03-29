const Lista = require('../models').Lista
const ListaItem = require('../models').ListaItem;

exports.listar = async function(req,res,next){
    let listas = await Lista.findAll()
    let foraneo = []
    for (let index = 0; index < listas.length; index++) {
        let aux = await ListaItem.findAll({
            where:{id_lista: listas[index].id_lista}
        })
        if(aux.length == 0){
            foraneo[index] = 0  //NO tiene item
        }
        else foraneo[index] = 1 //Tiene item
    }
    console.log(foraneo);
    res.render('lista', {
        listas: listas,
        foraneo: foraneo
    });
}

//Agregar Lista
exports.agregar = async function (req,res,next){
    await Lista.create({
        titulo: req.body.titulo,
        fecha_creacion: Date.now(), 
        fecha_resolucion: req.body.fecharesolucion,
        estado: req.body.estado,
    })
    req.flash('success_msg', 'Lista agregado correctamente.');
    res.redirect("/lista/mostrar");
};

//Actualizar Lista
exports.actualizar = async function (req,res,next){
    let id = req.body.id
    await Lista .update({
        titulo: req.body.titulo,
        fecha_creacion: req.body.fechacreacion, 
        fecha_resolucion: req.body.fecharesolucion,
        estado: req.body.estado},
        {where:{id_lista: id}
    })  
    res.redirect("/lista/mostrar");
    
}

//Borrar Item
exports.borrar = async function (req,res,next){
    let id = req.body.id
    let aux = await Lista.findOne({
        where: {id_lista: id}
    })
    if(aux.dataValues.estado == "Resuelta")
        await Lista.destroy({
        where:{id_item: id}
    })

    res.redirect("/lista/mostrar");
}