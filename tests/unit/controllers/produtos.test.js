const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);


const produtosService = require('../../../src/services/serviceProdutos')
const produtosController = require('../../../src/controllers/controlerProdutos')

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

describe('Testando produtos camada controller', function () {
  it('Testando se a função getTodosProdutos da a resposta adequadamente', async function () {
    const res = {};
    
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(produtosService, 'solicitarTodosProdutos').resolves(produtos)

     await produtosController.getTodosProdutos(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(produtos);

  })

  it('Testando se a função getTodosProdutos da a resposta adequadamente em caso de erro', async function () {
    const res = {};

    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(produtosService, 'solicitarTodosProdutos').resolves([])

    await produtosController.getTodosProdutos(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'não foi possivel listar todos os produtos' });

  })

  it('Testando se a função getProdutoId da a resposta adequadamente', async function () {
    const res = {};

    const req = {
      params: {
        id: '1',
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(produtosService, 'solicitarProdutoId').resolves(produtos[0])

    await produtosController.getProdutoId(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(produtos[0]);

  })

  it('Testando se a função getProdutoId da a resposta adequadamente em caso de erro', async function () {
    const res = {};

    const req = {
      params: {
        id: '77',
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(produtosService, 'solicitarProdutoId').resolves(null)

    await produtosController.getProdutoId(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });

  })

  it('Testando se a função postProduto da a resposta adequadamente em caso de acerto', async function () {
    const res = {};

    const req = {
      body: {
        name: 'ProdutoX'
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(produtosService, 'solicitarCadastro').resolves({ erro: null, message: 7 })

    await produtosController.postProduto(req, res)

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 7, name: 'ProdutoX' });

  })

  it('Testando se a função postProduto da a resposta adequadamente em caso de erro', async function () {
    const res = {};

    const req = {
      body: {
        name: 'Pro'
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(produtosService, 'solicitarCadastro').resolves({ erro: 'campo nome', message: '"name" length must be at least 5 characters long' })

    await produtosController.postProduto(req, res)

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });

  })

  it('Testando se a função deleteProduto da a resposta adequadamente em caso de erro', async function () {
    const res = {};

    const req = {
      params: {
        id: 1
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(produtosService, 'solicitarExclusao').resolves({ erro: 'id não existe', message: 'Product not found' })

    await produtosController.deleteProduto(req, res)

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'  });

  })

  it('Testando se a função deleteProduto da a resposta adequadamente em caso de acerto', async function () {
    const res = {};

    const req = {
      params: {
        id: 1
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(produtosService, 'solicitarExclusao').resolves({ erro: null, message: 1 })

    await produtosController.deleteProduto(req, res)

    expect(res.status).to.have.been.calledWith(204);
   

  })


  afterEach(function () {
    sinon.restore();
  });

})