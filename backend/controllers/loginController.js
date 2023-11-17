const UsuarioModel = require("../models/usuariosModel");


class LoginController {

    async autenticar(req, res) {
        if(req.body.email != undefined && req.body.senha != undefined) {
            let usuario = new UsuarioModel();
            usuario = await usuario.autenticar(req.body.email, req.body.senha)

            if(usuario != null) {
                res.cookie('cookieAuth', 'PFSII');
                res.status('200').json({msg: 'Usuário autenticado!', usuario: usuario.toJSON()});
            }
            else{
                res.status('404').json({msg: 'Usuário não encontrado'})
            }
        }
        else{
            res.status('400').json({msg: 'Requisição inválida'});
        }
    }
}

module.exports = LoginController;