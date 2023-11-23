const express = require('express');
const CategoriaControll = require('../controllers/categoriaController');

const router = express.Router();

let ctrl = new CategoriaControll();

router.get("/listar", (req, res) => {
    // #swagger.tags = ['Categoria']
    ctrl.listar(req, res);
})
module.exports = router;