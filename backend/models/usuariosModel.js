const Database = require('../utils/database');

const banco = new Database()
class UsuarioModel {

    #id;
    #nome;
    #email;
    #perfilId;
    #senha;
    #dataCadastro

    get senha() {
        return this.#senha;
    }
    set senha(senha){
        this.#senha = senha;
    }

    get id(){
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get nome(){
        return this.#nome;
    }
    
    set nome(nome) {
        this.#nome = nome;
    }

    get email(){
        return this.#email;
    }
    
    set email(email) {
        this.#email = email;
    }

    get perfilId(){
        return this.#perfilId;
    }
    
    set perfilId(perfilId) {
        this.#perfilId = perfilId;
    }

    get dataCadastro(){
        return this.#dataCadastro;
    }
    
    set dataCadastro(dataCadastro) {
        this.#dataCadastro = dataCadastro;
    }

    constructor(id, nome, email, perfilId, ativo, dataCadastro, senha){
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#perfilId = perfilId;
        this.#dataCadastro = dataCadastro;
        this.#senha = senha;
    }

    toJSON() {
        return {
            "id": this.#id,
            "nome": this.#nome,
            "email": this.#email,
            "perfilId": this.#perfilId,
            "senha": this.#senha
        }
    }

    async gravar(){
        if(this.#id == 0)//comando insert
        { 
            let sql = "insert into tb_usuario(usu_email, usu_senha, usu_nome, usu_datacadastro, per_id) values (?, ?, ?, now(), ?)"

            let valores = [this.#email,  this.#senha, this.#nome, this.#perfilId]

            let ok = await banco.ExecutaComandoNonQuery(sql, valores);

            return ok;
        }
        else //comando update
        { 
            let sql = "update tb_usuario set usu_email = ?, usu_senha = ?, usu_nome = ?, perfil_id = ? where usu_id = ?"

            let valores = [this.#email,  this.#senha, this.#nome, this.#perfilId, this.#id]

            let ok = await banco.ExecutamandoNonQuery(sql, valores);

            return ok;
        }
    }

    async obter(id){
        let sql = "select * from tb_usuario where usu_id = ?";
        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            let usuario = new UsuarioModel(rows[0]["usu_id"], rows[0]["usu_nome"], rows[0]["usu_email"], rows[0]["perfil_id"], rows[0]["usu_ativo"], rows[0]["usu_datacadastro"], rows[0]["usu_senha"]);

            return usuario;
        }

        return null
    }

    async obterTodos() {

        let sql  = "select * from tb_usuario";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for(let i = 0; i<rows.length; i++){
            lista.push(new UsuarioModel(rows[i]["usu_id"],
            rows[i]["usu_email"], rows[i]["usu_nome"], rows[i]["per_id"], rows[i]["usu_datacadastro"]))
        }

        return lista;
    }

    async excluir(id) {

        let sql = "delete from tb_usuario where usu_id = ?"

        let valores = [id];

        let ok = await banco.ExecutaComandoNonQuery(sql, valores);

        return ok;
    }

    async autenticar(email, senha) {

        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ? and usu_ativo = 'S'";

        let valores = [email, senha];

        let rows = await banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            return new UsuarioModel(rows[0]["usu_id"],
            rows[0]["usu_nome"], rows[0]["usu_email"], rows[0]["perfil_id"], rows[0]["usu_ativo"], rows[0]["usu_datacadastro"])
        }

        return null;
    }

}

module.exports = UsuarioModel;