const AssinaturaModel = require('../models/assinaturaModel');

class ClienteController {

    async sucesso(req,res){
        let assinatura = new AssinaturaModel();
        assinatura.pla_id = req.body.planoId;
        assinatura.usu_id = req.body.usuId;
        let ok = assinatura.gravar();
        if(ok){
            return res.redirect('/clientes');
        }else{
            res.status(500).json({msg: "Usuário não contém pagamento realizados!"})
        }
  
      }
}

module.exports = ClienteController;