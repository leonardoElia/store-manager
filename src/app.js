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

app.get('/products/:id', middlewaresValidacao.valicaoId, produtosController.getProdutoId);

app.post('/products', middlewaresValidacao.validacaoNomeExistente, produtosController.postProduto);

app.delete('/products/:id', middlewaresValidacao.valicaoId, produtosController.deleteProduto);

app.put('/products/:id',
  middlewaresValidacao.valicaoId,
  middlewaresValidacao.validacaoNomeExistente,
  produtosController.putProduto);

// rota de vendas 
app.post('/sales', middlewaresValidacao.validacaoVendas, vendasController.postVendas);

app.get('/sales', vendasController.getVendas);

app.get('/sales/:id', middlewaresValidacao.valicaoId, vendasController.getVendaId);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;