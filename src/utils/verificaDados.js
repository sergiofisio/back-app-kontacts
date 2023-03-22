const knex = require("../connection");

function verificarDados(res, objeto) {
  for (let chave in objeto) {
    if (!objeto[chave]) {
      res.status(400).json({ mensagem: `O campo '${chave}' é obrigatório!` });
      return false;
    }
  }
  return true;
}

async function verificarEmailCadastrado(res, { email }) {
  try {
    const usuario = await knex("usuarios").where({ email });
    return usuario;
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
}

module.exports = {
  verificarDados,
  verificarEmailCadastrado,
};
