const Database = require('../utils/database')

const conexao = new Database()

class PerfilModel {

    #perfilId;
    #perfilDescricao;

    get perfilId() {
        return this.#perfilId;
    }
    set perfilId(perfilId){
        this.#perfilId = perfilId;
    }

    get perfilDescricao() {
        return this.#perfilDescricao;
    }
    set perfilDescricao(perfilDescricao){
        this.#perfilDescricao = perfilDescricao;
    }

    constructor(perfilId, perfilDescricao){
        this.#perfilId = perfilId;
        this.#perfilDescricao = perfilDescricao;
    }

    async listarPerfil() {

        let lista = [];
        let sql = "select * from tb_perfil";

        let rows = await conexao.ExecutaComando(sql);

        for(let i = 0; i<rows.length; i++){

            let perfil = new PerfilModel(rows[i]["per_id"], rows[i]["per_nome"]);

            lista.push(perfil);
        }

        return lista;
    }

    toJSON() {
        return {
            "per_id": this.#perfilId,
            "per_nome": this.#perfilDescricao
        };
    }
}

module.exports = PerfilModel;