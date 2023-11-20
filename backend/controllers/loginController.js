const UsuarioModel = require("../models/usuariosModel");
const AssinaturaModel = require('../models/assinaturaModel');


class LoginController {

    async autenticar(req, res) {
        if(req.body.email != undefined && req.body.senha != undefined) {
            let usuario = new UsuarioModel();
            usuario = await usuario.autenticar(req.body.email, req.body.senha)

            if(usuario != null) {
                let assinatura = new AssinaturaModel();
                assinatura.pla_id = 1;
                assinatura.usu_id = usuario.id;
                assinatura.pago = false;
                assinatura = await assinatura.verificarPagamento();
                if(assinatura.pago || usuario.perfilId == 1){
                    res.cookie('cookieAuth', 'PFSII');
                    res.status('200').json({msg: 'Usuário autenticado!', usuario: usuario.toJSON()});
                }else{
                    res.status(500).json({msg: "Usuário não contém pagamento realizados!"})
                }
            }
            else{
                res.status('404').json({msg: 'Usuário não encontrado'})
            }
        }
        else{
            res.status('400').json({msg: 'Requisição inválida'});
        }
    }
    async logout(req, res) {
        res.clearCookie("cookieAuth");

        res.status(200).json({msg: "Usuário deslogado!"});
    } 
}

module.exports = LoginController;