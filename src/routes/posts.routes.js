const express = require("express")
const controller = require("../controllers/posts.controller")
const rotas = express.Router()

// ROTAS //

// Rascunhos (primeiro para evitar conflito com /:id)
rotas.get("/rascunhos", controller.rascunhos)

// CRUD Principal
rotas.get("/", controller.index)
rotas.get("/:id", controller.show)
rotas.post("/", controller.create)
rotas.put("/:id", controller.update)
rotas.delete("/:id", controller.delete)

// Status de Publicação
rotas.patch("/:id/publicacao", controller.alterarPublicacao)

// Sub-recursos (Comentários de um post)
rotas.get("/:id/comentarios", controller.listarComentarios)
rotas.post("/:id/comentarios", controller.criarComentario)

module.exports = rotas