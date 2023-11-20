const express = require('express');
const Autorizacao = require('../middlewares/autorizacao');
const ClienteController = require('../controllers/clienteController');

const router = express.Router();

let auth = new Autorizacao();
let ctrl = new ClienteController();
router.get('/', auth.validarToken, 
(req, res) => {
    // #swagger.tags = ['Perfil']
    /* #swagger.security = [{
        "apiKeyAuth": ['PFSII']
    }] */
    ctrl.listar(req, res);
})


module.exports = router;
