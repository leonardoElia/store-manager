const avisoID = { message: 'o id deve ser um número inteiro com o valor maior ou igual a 1' };

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

const validacaoId = (req, res, next) => {
  const { id } = req.body;

  const idNumber = Number(id);

  if (idNumber >= 1 && Number.isInteger(idNumber)) {
    next();
  }

  return res.status(400).json(avisoID);
};
module.exports = {
  validacaoNomeExistente,
  validacaoVendas,
  validacaoId,
};