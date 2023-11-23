const express = require('express');
const Autorizacao = require('../middlewares/autorizacao');
const PlanoControle = require('../controllers/planoController');


const router = express.Router();

let ctrl = new PlanoControle();

router.get('/listar', (req, res) => {
    // #swagger.tags = ['Plano']

    ctrl.listar(req,res);
})
router.get('/obter/:id', (req, res) => {
    // #swagger.tags = ['Plano']

    ctrl.obter(req,res);
})
module.exports = router;