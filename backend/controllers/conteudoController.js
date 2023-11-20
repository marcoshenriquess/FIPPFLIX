const ConteudoModel = require("../models/conteudoModel");

class conteudoController {

    async obter(req, res) {
        if(req.params.id != undefined) {
            let contModel = new ConteudoModel();
            contModel = await contModel.obter(req.params.id);
            if(contModel == null) {
                res.status(404).json({msg: "Conteúdo não encontrado!"})
            }
            else {
                res.status(200).json(contModel.toJSON());
            }
            
        }
        else {
            res.status(400).json({msg: "Parâmetro inválido"});
        }
    }

    async listar(req, res) {
        let contModel = new ConteudoModel();
        let lista = await contModel.obterTodos();
        let listaRetorno = [];

        for(let i = 0; i<lista.length; i++){
            listaRetorno.push(lista[i].toJSON())
        }

        res.status(200).json(listaRetorno);
    }

    async excluir(req, res) {
        try{
            if(req.params.id != null) {
                let contModel = new ConteudoModel();
                let ok = await contModel.excluir(req.params.id);

                if(ok) {
                    res.status(200).json({msg: "Conteúdo excluído com sucesso!"})
                }
                else{
                    res.status(500).json({msg: "Erro ao excluir Conteúdo"});
                }
            }
            else{
                res.status(400).json({msg: 'Parâmetro inválido'})
            }
        }
        catch(e){
            res.status(500).json({msg: e.message})
        }

    }

    async alterar(req, res){
        if(Object.keys(req.body).length == 5){

            let contModel = new ConteudoModel();

            contModel.id = req.body.id;
            contModel.youtubeid = req.body.youtubeid;
            contModel.titulo = req.body.titulo;
            contModel.disponivel = req.body.disponivel;
            contModel.cat_id = req.body.cat_id;
            let ok = await ConteudoModel.gravar()
            if(ok)
                res.status(200).json({msg: "Conteúdo alterado!"})
            else
                res.status(500).json({msg: "Erro ao alterar Conteúdo"})
        }
        else{
            res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

    criar(req, res) {
        if(Object.keys(req.body).length == 4) {
            let contModel = new ConteudoModel();

            contModel.id = 0;
            contModel.youtubeid = req.body.youtubeid;
            contModel.titulo = req.body.titulo;
            contModel.disponivel = req.body.disponivel;
            contModel.cat_id = req.body.cat_id;
            let ok = contModel.gravar()
            if(ok)
                res.status(200).json({msg: "Conteúdo adicionado!"})
            else
                res.status(500).json({msg: "Erro ao gravar Conteúdo"})
        }
        else{
            res.status(400).json({msg: "Parâmetros inválidos"})
        }
    }

}

module.exports = conteudoController;