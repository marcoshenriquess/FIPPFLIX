const Database = require('../utils/database');

const banco = new Database();

class CategoriaModel{
    #id;
    #nome;

    get id(){return this.#id}set id(id){this.#id = id}
    get nome(){return this.#nome}set nome(nome){this.#nome = nome}

    constructor(id,nome){
        this.#id = id;
        this.#nome = nome;
    }

    async listar(){
        let sql = "select * from tb_categoria";
        
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0;i<rows.length; i++){
            lista.push(new CategoriaModel(rows[i]['cat_id'],rows[i]['cat_descricao']))
        
        }
        return lista;

    }

    toJSON(){
        return {
            "id": this.#id,
            "nome": this.#nome
        }
    }
}
module.exports = CategoriaModel;