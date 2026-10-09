// Rotas dos Posts

const express = require("express") // Puxando o express pra funcionar
const controller = require("../controllers/posts.controller") // Variável que representa o caminho do controller de posts
const rotas = express.Router() // Função de roteamento

// ROTAS //

// Listagem de rascunhos (Importante: vir antes do /:id para não dar conflito de parâmetro)
rotas.get("/rascunhos", controller.rascunhos)

// CRUD Principal
rotas.get("/", controller.index)
rotas.get("/:id", controller.show)
rotas.post("/", controller.create)
rotas.put("/:id", controller.update)
rotas.delete("/:id", controller.delete)

// Rota específica para publicar ou voltar para rascunho (PATCH)
rotas.patch("/:id/publicacao", controller.alterarPublicacao)

// Sub-recursos (Comentários de um post específico)
//rotas.get("/:id/comentarios", controller.listarComentarios)
//rotas.post("/:id/comentarios", controller.criarComentario)

module.exports = rotas