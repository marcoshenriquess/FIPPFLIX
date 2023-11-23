const CategoriaModel = require("../models/categoriaModel");

class CategoriaControll{
    async listar(req,res){
        let cate = new CategoriaModel();
        let lista = await cate.listar();
        let listaJson = [];
        lista.forEach(function(value, index){
            listaJson.push(value.toJSON());
        })
        res.status(200).json(listaJson);
    }
}
module.exports = CategoriaControll;