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

const todasVendas = [
  {
    "saleId": 1,
    "date": "2023-02-16T17:03:29.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-16T17:03:29.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-16T17:03:29.000Z",
    "productId": 3,
    "quantity": 15
  }
]
const unicaVenda = [
  {
    "date": "2023-02-16T17:03:29.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-02-16T17:03:29.000Z",
    "productId": 2,
    "quantity": 10
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

  it('testando se a função solicitarListamentoVendas funciona corretamente', async function () {
    sinon.stub(vendasSQL, 'listarVendas').resolves(todasVendas)
  
    const resultado = await serviceVenda.solicitarListamentoVendas()

    expect(resultado).to.be.deep.equal(todasVendas)
  })

  it('testando se a função  solicitarVendaId funciona corretamente em caso de erro', async function () {
    sinon.stub(vendasSQL, 'listarVendaId').resolves([])

    const resultado = await serviceVenda.solicitarVendaId(1)

    expect(resultado).to.be.deep.equal({ erro: 'não tem id', message: 'Sale not found' })
  })

  it('testando se a função  solicitarVendaId funciona corretamente em caso de acerto', async function () {
    sinon.stub(vendasSQL, 'listarVendaId').resolves(unicaVenda)

    const resultado = await serviceVenda.solicitarVendaId(1)

    expect(resultado).to.be.deep.equal({ erro: null, message: unicaVenda })
  })


  afterEach(function () {
    sinon.restore();
  });
})