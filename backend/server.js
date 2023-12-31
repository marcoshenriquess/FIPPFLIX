const express = require('express');
const usuarioRota = require('./routes/usuarioRoute');
const perfilRota = require('./routes/perfilRoute');
const categoria = require('./routes/categoriaRoute');
const planoRota = require('./routes/planoRoute');
const loginRota = require('./routes/loginRoute');
const conteudoRota = require('./routes/conteudoRoute');
const assinaturaRota = require('./routes/assinaturaRoute');
const swaggerJson = require('./outputSwagger.json');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use('/usuario', usuarioRota);
app.use('/cliente', usuarioRota);
app.use('/conteudo', conteudoRota);
app.use('/categoria', categoria);
app.use('/perfil', perfilRota);
app.use('/plano', planoRota);
app.use('/login', loginRota);
app.use('/pagamento', assinaturaRota);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson))

app.listen('4000', function() {
    console.log('backend em execução');
})