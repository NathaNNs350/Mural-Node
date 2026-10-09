//Rotas dos Usuarios

const express = require("express") //puxando o express pra funcionar
const controller = require("../controllers/usuarios.controller") //variavel q vai representar o caminho do controler da sua tabela
const rotas = express.Router() //função de roteamento

//ROTAS//
rotas.get("/", controller.index)
rotas.get("/:id", controller.show)
rotas.post("/", controller.create)
rotas.put("/:id", controller.update)
rotas.delete("/:id", controller.delete)
rotas.get("/:id/posts", controller.show)
rotas.get("/:id/comentarios", controller.show)
module.exports = rotas