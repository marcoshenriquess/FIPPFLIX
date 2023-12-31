const express = require('express');
const PagamentoController = require('../controllers/assinaturaController.js');
const Autorizacao = require('../middlewares/autorizacao.js');

const router = express.Router();

let ctrl = new PagamentoController();

router.post("/checkout/", (req, res) => {
    // #swagger.tags = ['Pagamento']
    ctrl.checkout(req, res);
})

router.get("/listar", (req, res) => {
    // #swagger.tags = ['Pagamento']
    ctrl.listar(req, res);
})


router.post("/pagamento-sucesso/:usuId/:planoId", (req, res) =>  {
    // #swagger.tags = ['Pagamento']
    ctrl.sucesso(req, res);
})

module.exports = router;