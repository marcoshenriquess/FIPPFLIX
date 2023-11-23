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
    async obter(req, res) {
        if(req.params.id != undefined) {
            let plano = new PlanosModel();
            plano = await plano.obter(req.params.id);
            if(plano == null) {
                res.status(404).json({msg: "Plano não encontrado!"})
            }
            else {
                res.status(200).json(plano.toJSON());
            }
            
        }
        else {
            res.status(400).json({msg: "Parâmetro inválido"});
        }
    }
}
module.exports = PlanoControle;