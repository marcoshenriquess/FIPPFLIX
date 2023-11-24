const Database = require('../utils/database')

const conexao = new Database()

class AssinaturaModel {

    #usu_id;
    #pla_id;
    #pago;
    #dataPgto;
    #plano;
    #usuario;
    #valor;

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
    get dataPgto() {
        return this.#dataPgto;
    }
    set dataPgto(dataPgto){
        this.#dataPgto = dataPgto;
    }
    get plano() {
        return this.#plano;
    }
    set plano(plano){
        this.#plano = plano;
    }
    get usuario() {
        return this.#usuario;
    }
    set usuario(usuario){
        this.#usuario = usuario;
        
    }
    
    get valor() {
        return this.#valor;
    }
    set valor(valor){
        this.#valor = valor;
    }
    constructor(usu_id, pla_id, pago, dataPgto, plano, usuario, valor){
        this.#usu_id = usu_id;
        this.#pla_id = pla_id;
        this.#pago = pago;
        this.#dataPgto = dataPgto;
        this.#plano = plano;
        this.#usuario = usuario;
        this.#valor = valor;
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
    async obterTodos() {

        let sql  = "SELECT tb_pagamento.*,tb_usuario.usu_nome,tb_plano.pla_nome, tb_plano.pla_valor FROM tb_pagamento left join tb_usuario on tb_usuario.usu_id = tb_pagamento.usu_id left join tb_plano on tb_plano.pla_id = tb_pagamento.pla_id";

        let rows = await conexao.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i<rows.length; i++){
            lista.push(new AssinaturaModel(rows[i]["usu_id"],rows[i]["pla_id"],
              true, rows[i]["pag_data"], rows[i]["pla_nome"], rows[i]["usu_nome"],rows[i]["pla_valor"]))
        }

        return lista;
    }
    async verificarPagamento(){
        try {
           let sql = "select * from tb_pagamento where usu_id = ? and pla_id = ?"
           let valores = [this.#usu_id, this.#pla_id];
           
           let rows = await conexao.ExecutaComando(sql, valores);
           if(rows.length>0){
            let assinatura = new AssinaturaModel(this.#usu_id, this.#pla_id,true,rows[i]["pag_data"],'','','');
            return assinatura;
           }else{
            let assinatura = new AssinaturaModel(this.#usu_id, this.#pla_id,false, '','','','');
            return assinatura;            
           }
        } catch (error) {
            
        }
    }

    toJSON(){
        return{
            "dataPgto": this.#dataPgto,
            "usu_id": this.#usu_id,
            "pla_id": this.#pla_id,
            "pago": this.#pago,
            "plano": this.#plano,
            "usuario": this.#usuario,
            "valor": this.#valor
        }
    }


}

module.exports = AssinaturaModel;