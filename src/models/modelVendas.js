const conn = require('../connection');

const cadastrarVendas = async (vendas) => {
  const [{ insertId }] = await conn.execute(
    'INSERT INTO StoreManager.sales (date) values (now())',
  );
  
  await vendas.map(async (venda) => {
     await conn.execute(
      'INSERT INTO StoreManager.sales_products (product_id, sale_id, quantity) values (?, ?, ?)',
      [venda.productId, insertId, venda.quantity],
    );
  });

  return insertId;
};

const listarVendas = async () => {
  const [resultado] = await conn.execute(
`SELECT s.id  AS saleId, s.date, sp.product_id AS productId, sp.quantity 
FROM StoreManager.sales AS s
INNER JOIN StoreManager.sales_products AS sp
ON s.id = sp.sale_id
ORDER BY s.id, sp.product_id`,
  );

  return resultado;
};

const listarVendaId = async (id) => {
  const [resultado] = await conn.execute(
    `SELECT  s.date, sp.product_id AS productId, sp.quantity FROM StoreManager.sales AS s
INNER JOIN StoreManager.sales_products AS sp
ON s.id = sp.sale_id
WHERE s.id = ?
ORDER BY s.id, sp.product_id`, [id],
  );
  return resultado;
};

module.exports = {
  cadastrarVendas,
  listarVendas,
  listarVendaId,
};