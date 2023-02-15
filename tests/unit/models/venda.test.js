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

describe('Teste model vendas', function () {
  it('testando se a função cadastrarVendas retorna o id corretamente', async function () {
    sinon.stub(conn, 'execute').resolves([{ insertId:1 }])

    const resultado = await vendasSQL.cadastrarVendas(vendas)

    expect(resultado).equal(1)
  })
  afterEach(function () {
    sinon.restore();
  });
})