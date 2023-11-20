const Database = require('../utils/database')

const conexao = new Database()

class PerfilModel {

    #usu_id;
    #pla_id;

    get usu_id() {
        return this.#usu_id;
    }
    set usu_id(usu_id){
        this.#usu_id = usu_id;
    }

    get pla_id() {
        return this.#pla_id;
    }
    set pla_id(pla_id){
        this.#pla_id = pla_id;
    }

    constructor(usu_id, pla_id){
        this.#usu_id = usu_id;
        this.#pla_id = pla_id;
    }

    async gravar(){
        try {
            let sql = "insert into tb_pagamento(pag_data,usu_id,pla_id) values (now(), ?, ?)"

            let valores = [this.#usu_id,  this.#pla_id]
    
            let ok = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return ok;           
        } catch (error) {

        }
    }


}

module.exports = PerfilModel;