const { expect } = require('chai');
const sinon = require('sinon');
const conn = require('../../../src/connection')
const produtosSQL = require('../../../src/models/modelProduto')

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

describe('Teste de Produtos Model', function () {
  it('testando se a função listarTodosProdutos retorna uma lista com todos os produtos', async function () {
    sinon.stub(conn, 'execute').resolves([produtos])

    const resultado = await produtosSQL.listarTodosProdutos()

    expect(resultado).to.be.deep.equal(produtos)
  })

  it('testando se a função listrarProdutoId retorna um produto com id existente', async function () {
    sinon.stub(conn, 'execute').resolves([[produtos[0]]])

    const resultado = await produtosSQL.listrarProdutoId(1)

    expect(resultado).to.be.deep.equal(produtos[0])
  })

  afterEach(function () {
    sinon.restore();
  });
})