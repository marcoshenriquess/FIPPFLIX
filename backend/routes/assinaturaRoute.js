const express = require('express');
const PagamentoController = require('../controllers/assinaturaController.js');
const Autorizacao = require('../middlewares/autorizacao.js');

const router = express.Router();

let ctrl = new PagamentoController();

router.post("/checkout/", (req, res) => {
    // #swagger.tags = ['Pagamento']
    ctrl.checkout2(req, res);
})


router.post("/pagamento-sucesso/:planoId/:usuId", (req, res) =>  {
    // #swagger.tags = ['Pagamento']
    ctrl.sucesso(req, res);
})

module.exports = router;