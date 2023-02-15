const validacaoNomeExistente = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const validacaoVendas = (req, res, next) => {
  const vendas = req.body;

  if (!vendas) return res.status(400).json({ message: 'não há vendas' });
  
  const chaveProductId = vendas.every((venda) => 'productId' in venda);
  if (!chaveProductId) return res.status(400).json({ message: '"productId" is required' });

  const chaveQuantity = vendas.every((venda) => 'quantity' in venda);
  if (!chaveQuantity) return res.status(400).json({ message: '"quantity" is required' });

  next();
};

module.exports = {
  validacaoNomeExistente,
  validacaoVendas,
};