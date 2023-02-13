const produtosService = require('../services/serviceProdutos');

const getTodosProdutos = async (_req, res) => {
  const todosProdutos = await produtosService.solicitarTodosProdutos();
  if (todosProdutos.length > 0) return res.status(200).json(todosProdutos);
  return res.status(404).json({ message: 'não foi possivel listar todos os produtos' });
};

const getProdutoId = async (req, res) => {
  const { id } = req.params;
  const produto = await produtosService.solicitarProdutoId(id);
  if (produto) return res.status(200).json(produto);
  return res.status(404).json({ message: 'Product not found' });
};

module.exports = {
  getTodosProdutos,
  getProdutoId,
};