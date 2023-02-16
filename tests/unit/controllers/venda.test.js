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

  it('testando se a função getVendas funciona corretamente', async function () {
    const res = {};

    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(vendasService, 'solicitarListamentoVendas').resolves(todasVendas)

    await vendasController.getVendas(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(todasVendas);
  })

  it('testando se a função getVendaId funciona corretamente em caso de acerto', async function () {
    const res = {};

    const req = {
      params: {
        id: 1
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(vendasService, 'solicitarVendaId').resolves({erro: null, message: unicaVenda })

    await vendasController.getVendaId(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(unicaVenda);
  })

  it('testando se a função getVendaId funciona corretamente em caso de erro', async function () {
    const res = {};

    const req = {
      params: {
        id: 1
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(vendasService, 'solicitarVendaId').resolves({ erro: 'não tem id', message: 'Sale not found' })

    await vendasController.getVendaId(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  })


  afterEach(function () {
    sinon.restore();
  });
})