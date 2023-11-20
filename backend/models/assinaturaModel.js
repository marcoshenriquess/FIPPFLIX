const Database = require('../utils/database')

const conexao = new Database()

class AssinaturaModel {

    #usu_id;
    #pla_id;
    #pago;

    get usu_id() {
        return this.#usu_id;
    }
    set usu_id(usu_id){
        this.#usu_id = usu_id;
    }
    get pago() {
        return this.#pago;
    }
    set pago(pago){
        this.#pago = pago;
    }
    get pla_id() {
        return this.#pla_id;
    }
    set pla_id(pla_id){
        this.#pla_id = pla_id;
    }

    constructor(usu_id, pla_id, pago){
        this.#usu_id = usu_id;
        this.#pla_id = pla_id;
        this.#pago = pago;

    }

    async gravar(){
        try {
            let sql = "insert into tb_pagamento(pag_data,usu_id,pla_id) values (now(), ?, ?)"

            let valores = [this.#usu_id,  this.#pla_id]
    
            let ok = await conexao.ExecutaComandoNonQuery(sql, valores);
    
            return ok;           
        } catch (error) {

        }
    }
    async verificarPagamento(){
        try {
           let sql = "select * from tb_pagamento where usu_id = ? and pla_id = ?"
           let valores = [this.#usu_id, this.#pla_id];
           
           let rows = await conexao.ExecutaComando(sql, valores);
           if(rows.length>0){
            let assinatura = new AssinaturaModel(this.#usu_id, this.#pla_id,true);
            return assinatura;
           }else{
            let assinatura = new AssinaturaModel(this.#usu_id, this.#pla_id,false);
            return assinatura;            
           }
        } catch (error) {
            
        }
    }


}

module.exports = AssinaturaModel;