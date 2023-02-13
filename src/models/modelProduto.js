const conn = require('../connection');

const listarTodosProdutos = async () => {
  const [resultado] = await conn.execute('SELECT * FROM StoreManager.products');
  return resultado;
};

const listrarProdutoId = async (id) => {
  const [[resultado]] = await conn.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return resultado;
};

module.exports = {
  listarTodosProdutos,
  listrarProdutoId,
};