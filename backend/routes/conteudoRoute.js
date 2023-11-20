const express = require('express');
const ConteudoController = require('../controllers/conteudoController');
const Autorizacao = require('../middlewares/autorizacao');
 
let router = express.Router();

let ctrl = new ConteudoController();
let auth = new Autorizacao();

router.get("/obter/:id", auth.validarToken, (req, res) => {
    // #swagger.tags = ['Conteúdo']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    ctrl.obter(req, res);
})

router.get('/listar', 
auth.validarToken, (req, res) => {
    // #swagger.tags = ['Conteúdo']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    ctrl.listar(req, res);
});


router.post('/criar', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Conteúdo']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conteudo"
                    }  
                }
            }
        } 
    */
    ctrl.criar(req, res);

} );

router.put('/alterar', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Conteúdo']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/conteudo"
                    }  
                }
            }
        } 
    */
    ctrl.alterar(req, res);

} );
router.delete('/excluir/:id', auth.validarToken, (req, res) => {
    // #swagger.tags = ['Conteúdo']
    /* #swagger.security = [{
            "apiKeyAuth": ['PFSII']
    }] */
    //  #swagger.parameters['id'] = { description: 'Id do Conteúdo a ser excluído' }

    ctrl.excluir(req, res)
});

module.exports = router;