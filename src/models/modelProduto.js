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

const cadastrarProduto = async (nome) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)', [nome],
  );

  return insertId;
};

const deletarProduto = async (id) => {
  const [{ affectedRows }] = await conn.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
  return affectedRows;
};
const atualizarProduto = async (id, name) => {
  const [{ affectedRows }] = await conn.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?', [name, id],
  );
  return affectedRows;
  };

module.exports = {
  listarTodosProdutos,
  listrarProdutoId,
  cadastrarProduto,
  deletarProduto,
  atualizarProduto,
};