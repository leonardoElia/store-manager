const { expect } = require('chai');
const sinon = require('sinon');
const produtosSQL = require('../../../src/models/modelProduto')
const produtosService = require('../../../src/services/serviceProdutos')

const produtos = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
  }
]

describe('Testes produtos camada service', function () {
  it('Testando se a função solicitarTodosProdutos retorna o array corretamente', async function () {
    sinon.stub(produtosSQL, 'listarTodosProdutos').resolves(produtos)

    const resultado = await produtosService.solicitarTodosProdutos()

    expect(resultado).to.be.deep.equal(produtos)
  })

  it('Testando se a função solicitarProdutoId retorna o produto corretamente', async function () {
    sinon.stub(produtosSQL, 'listrarProdutoId').resolves(produtos[0])

    const resultado = await produtosService.solicitarProdutoId(1)

    expect(resultado).to.be.deep.equal(produtos[0])
  })

  afterEach(function () {
    sinon.restore();
  });
})