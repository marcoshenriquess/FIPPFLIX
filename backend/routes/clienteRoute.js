const express = require('express');
const Autorizacao = require('../middlewares/autorizacao');
const ClienteController = require('../controllers/clienteController');

const router = express.Router();

let auth = new Autorizacao();

router.get('/validar-assinatura', auth.validarToken, 
(req, res) => {
    // #swagger.tags = ['Perfil']
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    ctrl.validarAssinatura(req, res);
})

module.exports = router;
