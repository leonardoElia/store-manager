const produtosSQL = require('../models/modelProduto');

const solicitarTodosProdutos = async () => {
  const resultado = await produtosSQL.listarTodosProdutos();
  return resultado;
};

const solicitarProdutoId = async (id) => {
  const resultado = await produtosSQL.listrarProdutoId(id);
  return resultado;
};

const solicitarCadastro = async (nome) => {
  if (nome.length < 5) {
    return { erro: 'campo nome', message: '"name" length must be at least 5 characters long' };
  }
  const resultado = await produtosSQL.cadastrarProduto(nome);
  return { erro: null, message: resultado };
};

const solicitarExclusao = async (id) => {
  const resultado = await produtosSQL.deletarProduto(id);
  if (resultado === 0) {
    return { erro: 'id não existe', message: 'Product not found' };
  }
  
  return { erro: null, message: resultado };
};

module.exports = {
  solicitarTodosProdutos,
  solicitarProdutoId,
  solicitarCadastro,
  solicitarExclusao,
};