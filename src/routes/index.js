// Arquivo que faz as "consultas" das Rotas

const express = require("express")

// Prefixo das rotas
const categoriasRoutes = require("./categorias.routes")
const postsRoutes = require("./posts.routes")
const usuariosRoutes = require("./usuarios.routes")
const comentariosRoutes = require("./comentarios.routes")

const rotas = express.Router()

// Aqui o prefixo é definido
rotas.use("/categorias", categoriasRoutes)
rotas.use("/posts", postsRoutes)
rotas.use("/usuarios", usuariosRoutes)
rotas.use("/comentarios", comentariosRoutes)

module.exports = rotas