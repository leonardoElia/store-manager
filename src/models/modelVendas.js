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

module.exports = {
  cadastrarVendas,
};