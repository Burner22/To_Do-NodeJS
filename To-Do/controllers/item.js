const Item = require('../models').Item;
const ListaItem = require('../models').ListaItem;

//Listar item ------------------------------------------
exports.listar = async function (req, res, next) {
    let items= await Item.findAll();
    let foraneo = []
    for (let index = 0; index < items.length; index++) {
        let aux = await ListaItem.findAll({
            where:{id_item: items[index].id_item}
        })
        if(aux.length == 0){
            foraneo[index] = 0
        }
        else foraneo[index] = 1
    }
    res.render('item', {
        items: items,
        foraneo: foraneo
    });
};

//Agregar Item
exports.agregar = async function (req,res,next){
    await Item.create({
        titulo: req.body.titulo,
        fecha_creacion: Date.now(), 
        fecha_resolucion: req.body.fecharesolucion,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad,
        fecha_limite: req.body.fechalimite,
        estado: req.body.estado,
    })
    req.flash('success_msg', 'Item agregado correctamente.');
    res.redirect("/item/mostrar");
};

//Actualizar Item
exports.actualizar = async function (req,res,next){
    let id = req.body.id
    let aux = await Item.findOne({
        where: {id_item: id}
    })
    console.log(aux.dataValues.estado);
    if(aux.dataValues.estado != "Resuelta"){
        await Item.update({
            titulo: req.body.titulo,
            fecha_creacion: req.body.fechacreacion, 
            fecha_resolucion: req.body.fecharesolucion,
            descripcion: req.body.descripcion,
            prioridad: req.body.prioridad,
            fecha_limite: req.body.fechalimite,
            estado: req.body.estado},
            {where:{id_item: id}
        }) 

        req.flash('success_msg', 'Su item ha sido actualizado');
        res.redirect("/item/mostrar");
    }
    else if(aux.dataValues.estado == "Resuelta"){
        req.flash('error_msg', 'Su item esta resuelto no puede actualizar su estado');
        res.redirect("/item/mostrar");
    }    
}

//Borrar Item
exports.borrar = async function (req,res,next){
    let id = req.body.id
    await ListaItem.destroy({
        where:{id_item: id}
    })
    await Item.destroy({
        where:{id_item: id}
    })
    res.redirect("/item/mostrar");
}


