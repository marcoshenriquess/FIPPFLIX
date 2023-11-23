const Database = require('../utils/database');

const banco = new Database()
class ConteudoModel {

    #id;
    #youtubeid;
    #titulo;
    #disponivel;
    #cat_id;

    get cat_id() {
        return this.#cat_id;
    }
    set cat_id(cat_id){
        this.#cat_id = cat_id;
    }

    get id(){
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get youtubeid(){
        return this.#youtubeid;
    }
    
    set youtubeid(youtubeid) {
        this.#youtubeid = youtubeid;
    }

    get titulo(){
        return this.#titulo;
    }
    
    set titulo(titulo) {
        this.#titulo = titulo;
    }

    get disponivel(){
        return this.#disponivel;
    }
    
    set disponivel(disponivel) {
        this.#disponivel = disponivel;
    }


    constructor(id, youtubeid, titulo, disponivel, cat_id){
        this.#id = id;
        this.#youtubeid = youtubeid;
        this.#titulo = titulo;
        this.#disponivel = disponivel;
        this.#cat_id = cat_id;
    }

    toJSON() {
        return {
            "id": this.#id,
            "youtubeId": this.#youtubeid,
            "titulo": this.#titulo,
            "disponivel": this.#disponivel,
            "cat_id": this.#cat_id
        }
    }

    async gravar(){
        if(this.#id == 0)//comando insert
        { 
            let sql = "insert into tb_conteudo(con_youtubeid, con_titulo, con_disponivel, cat_id) values (?, ?, ?, ?)"

            let valores = [this.#youtubeid,  this.#titulo, this.#disponivel, this.#cat_id]

            let idGravado = await banco.ExecutaComandoLastInserted(sql, valores);

            return idGravado;
        }
        else //comando update
        { 
            let sql = "update tb_conteudo set con_youtubeid = ?, con_titulo = ?, con_disponivel = ?, cat_id = ? where con_id = ?"

            let valores = [this.#youtubeid,  this.#titulo, this.#disponivel, this.#disponivel, this.#cat_id, this.#id]

            let ok = await banco.ExecutamandoNonQuery(sql, valores);

            return ok;
        }
    }

    async obter(id){
        let sql = "select * from tb_conteudo where con_id = ?";
        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let usuario = new ConteudoModel(rows[0]["con_id"], rows[0]["con_titulo"], rows[0]["con_disponivel"], rows[0]["cat_id"]);

            return usuario;
        }

        return null
    }
    async obterLastInsert(){
            let sql = "select  con_id from tb_conteudo  order by con_id desc limit 1";
            let rows = await banco.ExecutaComando(sql);
            let Id = rows[0]["cat_idid"];
            return Id;
        }
    async obterTodos() {

        let sql  = "select * from tb_conteudo";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i<rows.length; i++){
            lista.push(new ConteudoModel(rows[i]["con_id"], rows[i]['con_youtubeid'], rows[i]["con_titulo"], rows[i]["con_disponivel"], rows[i]["cat_id"]))
        }

        return lista;
    }

    async excluir(id) {

        let sql = "delete from tb_conteudo where con_id = ?"

        let valores = [id];

        let ok = await banco.ExecutaComandoNonQuery(sql, valores);

        return ok;
    }


}

module.exports = ConteudoModel;