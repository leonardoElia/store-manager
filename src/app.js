const express = require('express');

const produtosController = require('./controllers/controlerProdutos');
const vendasController = require('./controllers/controllerVendas');
const middlewaresValidacao = require('./middlewares/index');

const app = express();

app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// rota de produtos
app.get('/products', produtosController.getTodosProdutos);

app.get('/products/:id', produtosController.getProdutoId);

app.post('/products', middlewaresValidacao.validacaoNomeExistente, produtosController.postProduto);

app.delete('/products/:id', produtosController.deleteProduto);

// rota de vendas 
app.post('/sales', middlewaresValidacao.validacaoVendas, vendasController.postVendas);
// teste
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;