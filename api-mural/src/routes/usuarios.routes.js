const express = require("express")
const db = require("../infra/database")

const app = express()
app.use(express.json())

//lista usuarios
app.get("/usuarios", async (req, res) => {
    const usuarios = await db("usuarios").select("*")
    res.json(usuarios)
})

//buscar um usuario
app.get("/usuarios/:id", async (req, res) => {
    const usuario = await db("usuarios").where({ id: req.params.id }).first()
    if (!usuarios) {
        return res.status(404).json({ erro: "Usuário não encontrado" })
    }
    res.json(usuarios)
})

//criar usuario
app.post('/usuarios', async (req, res) => {
    
})

//Atualiza nome ou e-mail


//deletar um usuario

//provavelmente ta tudo errado entao nao confiem em tudo!!!