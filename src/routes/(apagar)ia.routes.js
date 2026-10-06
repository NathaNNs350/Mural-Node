const express = require('express');
const app = express();

//lista usuarios
app.get("/20261005124004_usuarios.js", async (req, res) => {
    const usuarios = await db("usuarios").select("*")
    res.json(usuarios)
})

//buscar um usuario
app.get("/20261005124004_usuarios.js/:id", async (req, res) => {
    const usuario = await db("usuarios").where({ id: req.params.id }).first()

    if (!usuarios) {
        return res.status(404).json({ erro: "Usuário não encontrado" })
    }

    res.json(usuarios)
})

//criar usuario
app.post('/20261005124004_usuarios.js', async (req, res) => {
    const { nome, email, } = req.body;

    if (!nome || !email) { return res.status(400).json({ mensagem: "Nome e email são obrigatórios." }) }

    const [novoId] = await db("usuarios").insert({ nome, email })

    const usuarioCriado = await db("usuarios").where({ id: novoId }).first()

    return res.status(201).json({ mensagem: 'Usuário criado com sucesso!' })
});

//Atualiza nome ou e-mail
app.put('/20261005124004_usuarios.js/:id', async (req, res) => {

    const { id } = req.params;
    const { nome, email } = req.body;

    const usuario = await db("usuarios").where({ id }).first();

        if (!usuarios) {
        return res.status(404).json({ erro: "Usuário não encontrado" })
        }

        await db("usuarios").where({ id }).update({nome: nome || usuario.nome, email: email || usuario.email});

        const usuarioAtualizado = await db("usuarios").where({ id }).first();

        return res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!' });
})

//deletar um usuario
app.delete('/20261005124004_usuarios.js/:id', async (req, res) => {
    const { id } = req.params

    const usuario = await db("usuarios").where({ id }).first()

    if (!usuario) { return res.status(404).json({ mensagem: 'Usuário não encontrado.' }) }

    await db("usuarios").where({ id }).del()

    return res.status(200).json({mensagem: `Usuário ${usuario.nome} removido com sucesso!`})
})