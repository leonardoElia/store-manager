const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const vendasService = require('../../../src/services/serviceVendas')
const vendasController = require('../../../src/controllers/controllerVendas')

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

mockObject = {
  id: 1,
  itemsSold: [
    ...vendas
  ]
}



describe('Teste da vendas camada controler', function () {
  it('testando se a função postVendas funciona corretamente em caso de acerto', async function () {
    const res = {};

    const req = {
      body: vendas
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(vendasService, 'solicitarCadastroVenda').resolves({ erro: null, message: 1 })

    await vendasController.postVendas(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(mockObject);
  })

  it('testando se a função postVendas funciona corretamente em caso de erro na chave quantity', async function () {
    const res = {};

    const req = {
      body: [
        {
          "productId": 1,
          "quantity": 0
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(vendasService, 'solicitarCadastroVenda').resolves({ erro: 'campo quantity', message: '"quantity" must be greater than or equal to 1' })

    await vendasController.postVendas(req, res)

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  })

  it('testando se a função postVendas funciona corretamente em caso de erro na chave productId', async function () {
    const res = {};

    const req = {
      body: [
        {
          "productId": 9,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(vendasService, 'solicitarCadastroVenda').resolves({ erro: 'campo ProductId', message: 'Product not found' })

    await vendasController.postVendas(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  })

  afterEach(function () {
    sinon.restore();
  });
})