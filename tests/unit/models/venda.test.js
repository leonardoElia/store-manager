const { expect } = require('chai');
const sinon = require('sinon');
const conn = require('../../../src/connection')

const vendasSQL = require('../../../src/models/modelVendas')

describe('Teste model vendas', function () {
  it('testando se a função cadastrarVendas retorna o id corretamente', function () {
    sinon.stub(conn, 'execute').resolves()
  })
  afterEach(function () {
    sinon.restore();
  });
})