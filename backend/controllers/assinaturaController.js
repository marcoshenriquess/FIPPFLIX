
const AssinaturaModel = require('../models/assinaturaModel');
const PlanosModel = require("../models/planosModel");

const stripe = require('stripe')('sk_test_51NuhsfKJ4ExSCfWr7N7tsD8LhsqlRPm0CnHn8TxIoAZkRJsOSGaofgS9TxFHA2AWTcmZMzuKhyh0qotNfGRq7jYn0048B8tPws');

class PagamentoController {
  async listar(req, res) {
    let assinatura = new AssinaturaModel();
    let lista = await assinatura.obterTodos();
    let listaRetorno = [];

    for(let i = 0; i<lista.length; i++){
        listaRetorno.push(lista[i].toJSON())
    }

    res.status(200).json(listaRetorno);
}
    async checkout(req, res) {
        if( req.body.nome != "" && req.body.planoId != "" && req.body.usuId != "" ){
          let plano = new PlanosModel();
          plano = await plano.obter(req.body.planoId);
            const session = await stripe.checkout.sessions.create({
                line_items: [
                  {
                    price_data: {
                      currency: 'brl', //ou usd
                      product_data: {
                        name: `Pagamento referente ao plano ${plano.nome} do usuário ${req.body.nome}`,
                      },
                      unit_amount: parseInt(plano.valor.replace(".",'')),
                    },
                    quantity: 1,
                  },
                ],
                mode: 'payment',
                success_url: `http://localhost:3000/`,
                cancel_url: `http://localhost:3000/teste`,
              });
              res.status(200).json({url: session.url}); 
      }
        else{
            res.status(400).json({msg: "Parâmetros inválidos!"});        }
    }
    async sucesso(req,res){
      let assinatura = new AssinaturaModel();
      assinatura.pla_id = req.params.planoId;
      assinatura.usu_id = req.params.usuId;
      let ok = assinatura.gravar();
      if(ok){
        return res.redirect('/cliente');
      }

    }
}

module.exports = PagamentoController;