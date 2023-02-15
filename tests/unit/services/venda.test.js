const { expect } = require('chai');
const sinon = require('sinon');

const vendasSQL = require('../../../src/models/modelVendas')
const produtosSQL = require('../../../src/models/modelProduto')
const serviceVenda = require('../../../src/services/serviceVendas')

const vendas = [
  {
    "productId": 1,
    "quantity": 1
  },
  {
    "productId": 2,
    "quantity": 5
  }
]


describe('Fazendo teste de service Vendas', function () {
  it('testando se a função solicitarCadastroVenda funciona corretamento em caso de acerto', async function () {
    sinon.stub(vendasSQL, 'cadastrarVendas').resolves(1)
    sinon.stub(produtosSQL, 'listrarProdutoId').resolves(true)

    const resultado = await serviceVenda.solicitarCadastroVenda(vendas)

    expect(resultado).to.be.deep.equal({ erro: null, message: 1 })
  })

  it('testando se a função solicitarCadastroVenda funciona corretamento em caso de erro na chave quantity', async function () {
    const resultado = await serviceVenda.solicitarCadastroVenda([
      {
        "productId": 1,
        "quantity": 0
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ])

    expect(resultado).to.be.deep.equal({ erro: 'campo quantity', message: '"quantity" must be greater than or equal to 1' })
  })

  it('testando se a função solicitarCadastroVenda funciona corretamento em caso de erro na chave ProductID', async function () {
    sinon.stub(produtosSQL, 'listrarProdutoId').resolves(false)

    const resultado = await serviceVenda.solicitarCadastroVenda([
      {
        "productId": 19,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ])

    expect(resultado).to.be.deep.equal({ erro: 'campo ProductId', message: 'Product not found' })
  })

  afterEach(function () {
    sinon.restore();
  });
})