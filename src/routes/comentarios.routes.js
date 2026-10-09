// Rotas dos Comentários

const express = require("express") //puxando o express pra funcionar
const controller = require("../controllers/comentarios.controller") //variavel q vai representar o caminho do controler da sua tabela
const rotas = express.Router() //função de roteamento

//ROTAS//
rotas.put("/:id", controller.update)
rotas.delete("/:id", controller.delete)
module.exports = rotas