//Arquivo que faz as "consultas" das Rotas

const express = require("express")

//Prefixo das rotas
const categoriasRoutes = require("./categorias.routes")
// const usuariosRoutes = require("./usuarios.routes")


const rotas = express.Router()

// Aqui o prefixo é definido
rotas.use("/categorias", categoriasRoutes)
// rotas.use("/usuarios", usuariosRoutes)
// rotas.use("/posts", postsRoutes)

module.exports = rotas