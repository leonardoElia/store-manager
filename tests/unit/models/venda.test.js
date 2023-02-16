const { expect } = require('chai');
const { equal } = require('joi');
const sinon = require('sinon');
const conn = require('../../../src/connection')

const vendasSQL = require('../../../src/models/modelVendas')

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



describe('Teste model vendas', function () {
  it('testando se a função cadastrarVendas retorna o id corretamente', async function () {
    sinon.stub(conn, 'execute').resolves([{ insertId:1 }])

    const resultado = await vendasSQL.cadastrarVendas(vendas)

    expect(resultado).equal(1)
  })

  it('testando se a função listarVendas retorna as vendas corretamente', async function () {
    sinon.stub(conn, 'execute').resolves([todasVendas])

    const resultado = await vendasSQL.listarVendas()

    expect(resultado).equal(todasVendas)
  })

  it('testando se a função listarVendaId retorna a venda corretamente', async function () {
    sinon.stub(conn, 'execute').resolves([unicaVenda])

    const resultado = await vendasSQL.listarVendaId(1)

    expect(resultado).equal(unicaVenda)
  })
  afterEach(function () {
    sinon.restore();
  });
})