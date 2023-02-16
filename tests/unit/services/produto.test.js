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

  it('Testando se a função solicitarCadastro retorna o objeto corretamente em caso de acerto', async function () {
    sinon.stub(produtosSQL, 'cadastrarProduto').resolves(7)

    const resultado = await produtosService.solicitarCadastro('ProdutoX')

    expect(resultado).to.be.deep.equal({ erro: null, message: 7 })
  })

  it('Testando se a função solicitarCadastro retorna o objeto corretamente em caso de erro', async function () {
    const resultado = await produtosService.solicitarCadastro('Pro')

    expect(resultado).to.be.deep.equal({ erro: 'campo nome', message: '"name" length must be at least 5 characters long' })
  })

  it('Testando se a função solicitarExclusao retorna o objeto corretamente em caso de acerto', async function () {
    sinon.stub(produtosSQL, 'deletarProduto').resolves(1)

    const resultado = await produtosService.solicitarExclusao(1)

    expect(resultado).to.be.deep.equal({ erro: null, message: 1 })
  })

  it('Testando se a função solicitarExclusao retorna o objeto corretamente em caso de erro', async function () {
    sinon.stub(produtosSQL, 'deletarProduto').resolves(0)

    const resultado = await produtosService.solicitarExclusao(1)

    expect(resultado).to.be.deep.equal({ erro: 'id não existe', message: 'Product not found' })
  })

  it('Testando se a função solicitarAtualizacao retorna o objeto corretamente em caso de erro no nome', async function () {
    
    const resultado = await produtosService.solicitarAtualizacao(1, 'Pro')

    expect(resultado).to.be.deep.equal({ erro: 'campo nome', message: '"name" length must be at least 5 characters long' })
  })

  it('Testando se a função solicitarAtualizacao retorna o objeto corretamente em caso de erro no produto', async function () {
    sinon.stub(produtosSQL, 'listrarProdutoId').resolves(false)

    const resultado = await produtosService.solicitarAtualizacao(1, 'Produto X')

    expect(resultado).to.be.deep.equal({ erro: 'campo ProductId', message: 'Product not found' })
  })

  it('Testando se a função solicitarAtualizacao retorna o objeto corretamente em caso de erro na operação', async function () {
    sinon.stub(produtosSQL, 'listrarProdutoId').resolves(true)
    sinon.stub(produtosSQL, 'atualizarProduto').resolves(0)

    const resultado = await produtosService.solicitarAtualizacao(1, 'Produto X')

    expect(resultado).to.be.deep.equal({ erro: 'erro no update', message: 'não foi possivel realizar operação' })
  })

  it('Testando se a função solicitarAtualizacao retorna o objeto corretamente em caso de acerto', async function () {
    sinon.stub(produtosSQL, 'listrarProdutoId').resolves(true)
    sinon.stub(produtosSQL, 'atualizarProduto').resolves(1)

    const resultado = await produtosService.solicitarAtualizacao(1, 'Produto X')

    expect(resultado).to.be.deep.equal({ erro: null, message: '' })
  })

  afterEach(function () {
    sinon.restore();
  });
})