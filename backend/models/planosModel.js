const Database = require("../utils/database");

const conexao = new     Database();

class PlanosModel{
    #id;
    #nome;
    #descricao;
    #valor;

    get id(){return this.#id}set id(id){this.#id = id}
    get nome(){return this.#nome}set nome(nome){this.#nome = nome}
    get descricao(){return this.#descricao}set descricao(descricao){this.#descricao = descricao}
    get valor(){return this.#valor}set valor(valor){this.#valor = valor}

    constructor(id, nome, descricao, valor){
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#valor = valor
    }

    async listarPlano(){
        let lista = [];
        let sql = "select * from tb_plano";
        
        let rows = await conexao.ExecutaComando(sql);
        
        for(let i = 0; i<rows.length; i++){
            
            let planos = new PlanosModel(rows[i]["pla_id"], rows[i]["pla_nome"], rows[i]["pla_descricao"], rows[i]["pla_valor"]);

            lista.push(planos);

        }
        return lista;
    }
    toJSON(){
        return {
            "pla_id": this.#id,
            "pla_nome": this.#nome,
            "pla_descricao": this.#descricao,
            "pla_valor": this.#valor
        };
    }
}
module.exports = PlanosModel;