const vendasService = require('../services/serviceVendas');

const postVendas = async (req, res) => {
  const vendas = req.body;
  
  const resultado = await vendasService.solicitarCadastroVenda(vendas);

  const { erro, message } = resultado;
  if (erro === 'campo quantity') {
    return res.status(422).json({ message });
  } if (erro === 'campo ProductId') {
    return res.status(404).json({ message });
  }
 
  return res.status(201).json({
    id: message,
    itemsSold: [
      ...vendas,
    ],
  });
};

module.exports = {
  postVendas,
};