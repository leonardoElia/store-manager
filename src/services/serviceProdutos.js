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
  const resultado = await produtosSQL.cadastrarProduto(nome);
  return resultado;
};
module.exports = {
  solicitarTodosProdutos,
  solicitarProdutoId,
  solicitarCadastro,
};