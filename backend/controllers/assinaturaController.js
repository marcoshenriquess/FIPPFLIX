
const AssinaturaModel = require('../models/assinaturaModel');

const stripe = require('stripe')('sk_test_51NuhsfKJ4ExSCfWr7N7tsD8LhsqlRPm0CnHn8TxIoAZkRJsOSGaofgS9TxFHA2AWTcmZMzuKhyh0qotNfGRq7jYn0048B8tPws');

class PagamentoController {
    async checkout(req, res) {
        if(req.body.valor != "" && req.body.plano != "" && req.body.nome != "" && req.body.planoId != "" && req.body.usuId != "" ){
            const session = await stripe.checkout.sessions.create({
                line_items: [
                  {
                    price_data: {
                      currency: 'brl', //ou usd
                      product_data: {
                        name: `Pagamento referente ao plano ${req.body.plano} do usuário ${req.body.nome}`,
                      },
                      unit_amount: parseInt(req.body.valor),
                    },
                    quantity: 1,
                  },
                ],
                mode: 'payment',
                success_url: `http://localhost:3000/cliente/pagamento-sucesso/`,
                cancel_url: `http://localhost:3000/`,
              });
              res.redirect(303, session.url);       
      }
        else{
            res.status(400).json({msg: "Parâmetros inválidos!"});        }
    }
    async sucesso(req,res){
      let assinatura = new AssinaturaModel();
      assinatura.pla_id = req.body.planoId;
      assinatura.usu_id = req.body.usuId;
      let ok = assinatura.gravar();
      if(ok){
        return res.redirect('/clientes');
      }

    }
}

module.exports = PagamentoController;