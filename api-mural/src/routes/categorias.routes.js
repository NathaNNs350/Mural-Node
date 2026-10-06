const express = require("express")
const controller = require("../controllers/categorias.controller")
const rotas = express.Router()
rotas.get("/", controller.index)
rotas.get("/:id", controller.show)
rotas.post("/", controller.create)
rotas.put("/:id", controller.update)
rotas.delete("/:id", controller.delete)
module.exports = rotas