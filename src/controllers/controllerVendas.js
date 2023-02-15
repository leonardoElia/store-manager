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

const getVendas = async (_req, res) => {
  const resultado = await vendasService.solicitarListamentoVendas();
  res.status(200).json(resultado);
};

const getVendaId = async (req, res) => {
  const { id } = req.params;
  const resultado = await vendasService.solicitarVendaId(id);
  const { erro, message } = resultado;
  if (erro) {
    return res.status(404).json({ message });
  }
  console.log('controler');
console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  postVendas,
  getVendas,
  getVendaId,
};