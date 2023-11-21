const PlanosModel = require("../models/planosModel");


class PlanoControle{
    
    async listar(req,res){
        let plano = new PlanosModel();
        let lista = await plano.listarPlano();
        let listaJson = [];
        lista.forEach(function(value, index){
            listaJson.push(value.toJSON());
        })
        res.status(200).json(listaJson);
    }
}
module.exports = PlanoControle;