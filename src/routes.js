const express = require("express");
const {
  detalharUsuarioLogado,
  detalharContatoLogado,
  cadastrarContatoLogado,
  atualizarContatoLogado,
  listarContatosLogado,
  deletarContatoLogado,
} = require("./controllers/userLogado");
const { cadastrarUsuario, efetuarLogin } = require("./controllers/users");
const {
  verificarDadosCadastro,
  verificarDadosLogin,
  verificarLogin,
} = require("./middlewares/mdUsers");
const rota = express();

rota.post("/usuario", verificarDadosCadastro, cadastrarUsuario);
rota.post("/login", verificarDadosLogin, efetuarLogin);

rota.use(verificarLogin);

rota.get("/usuario", detalharUsuarioLogado);
rota.get("/contato/:id", detalharContatoLogado);
rota.get("/contato", listarContatosLogado);
rota.post("/contato", cadastrarContatoLogado);
rota.put("/contato/:id", atualizarContatoLogado);
rota.delete("/contato/:id", deletarContatoLogado);

module.exports = rota;
