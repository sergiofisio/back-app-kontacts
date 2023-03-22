const knex = require("../connection");

const detalharUsuarioLogado = (req, res) => {
  return res.status(200).json(req.usuario);
};

const detalharContatoLogado = async (req, res) => {
  const { id: contato_id } = req.params;
  const { id: usuario_id } = req.usuario;

  try {
    const contato = await knex("contatos as c")
      .select("c.id", "c.nome", "c.email", "c.telefone", "c.usuario_id")
      .where("c.id", contato_id);

    if (contato.length <= 0)
      return res.status(400).json({ mensagem: "Transação não encontrada" });

    return res.json(contato);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const cadastrarContatoLogado = async (req, res) => {
  const { id: usuario_id } = req.usuario;
  const { nome, email, telefone } = req.body;

  try {
    const contato = await knex("contatos")
      .insert({ nome, email, telefone, usuario_id })
      .returning("*");

    if (contato.length <= 0)
      return res.status(400).json({ mensagem: "Operação falhou!" });

    const resposta = {
      id: contato[0].id,
      nome,
      email,
      telefone: `(${telefone.slice(0, 2)}) ${telefone.slice(
        2,
        3
      )} ${telefone.slice(3, 7)}-${telefone.slice(7)}`,
      usuario_id,
    };

    return res.json({ ...resposta });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listarContatosLogado = async (req, res) => {
  const { id: usuario_id } = req.usuario;

  try {
    const contatos = await knex("contatos as c")
      .select("c.id", "c.nome", "c.email", "c.telefone")
      .where("c.usuario_id", usuario_id);

    return res.json(contatos);
  } catch {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const atualizarContatoLogado = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;

  try {
    await knex("contatos").update({ nome, email, telefone }).where({ id });

    res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const deletarContatoLogado = async (req, res) => {
  const { id } = req.params;

  try {
    await knex("contatos").del().where({ id });

    res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  detalharUsuarioLogado,
  deletarContatoLogado,
  detalharContatoLogado,
  cadastrarContatoLogado,
  listarContatosLogado,
  atualizarContatoLogado,
};
