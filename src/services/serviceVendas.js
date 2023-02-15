const vendasSQL = require('../models/modelVendas');
const produtosSQL = require('../models/modelProduto');

const solicitarCadastroVenda = async (vendas) => {
  const chaveQuantity = vendas.every((venda) => venda.quantity > 0);
  if (!chaveQuantity) {
    return { erro: 'campo quantity', message: '"quantity" must be greater than or equal to 1' };
  }
  const promises = await vendas.map(async (venda) => {
    const verificaProduto = await produtosSQL.listrarProdutoId(venda.productId);
    if (verificaProduto) {
      return true;
    }
    return false;
  });
 
  const validatePromises = await Promise.all(promises);
  
  const produtoExistente = validatePromises.every((e) => e === true);
  if (!produtoExistente) {
    return { erro: 'campo ProductId', message: 'Product not found' };
  }
  
  const resultado = await vendasSQL.cadastrarVendas(vendas);
  return { erro: null, message: resultado };
};

const solicitarListamentoVendas = async () => {
  const resultado = await vendasSQL.listarVendas();
  return resultado;
};

const solicitarVendaId = async (id) => {
  const resultado = await vendasSQL.listarVendaId(id);
  if (resultado.length === 0) {
    return { erro: 'não tem id', message: 'Sale not found' };
  }

  return { erro: null, message: resultado };
};

module.exports = {
  solicitarCadastroVenda,
  solicitarListamentoVendas,
  solicitarVendaId,
};
