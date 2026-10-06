const express = require("express")
const categoriasRoutes = require("./categorias.routes")
const rotas = express.Router()
// Aqui o prefixo é definido
rotas.use("/categorias", categoriasRoutes)
// Futuramente:
// rotas.use("/usuarios", usuariosRoutes)
// rotas.use("/posts", postsRoutes)
module.exports = rotas