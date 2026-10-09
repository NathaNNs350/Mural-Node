// src/repositories/usuarios.repository.js
const db = require("../infra/database")
//tabela principal
const TABELA2 = "usuarios"
//Tabela Secundaria (Chave Estrangeira)
const TABELASEC = "posts"
//tabela tercearia (chave estrangeira)
const TABELATER = "comentarios"

module.exports = {
    // lista todos os usuarios
    async index() {
        return db(TABELA2).select("*").orderBy("nome", "asc")
    },

    // buscar usuário expecifico
    async show(id) {
        return db(TABELA2).where({ id }).first()
    },

    // cadastrar um usuario
    async create(dados) {
        const [id] = await db(TABELA2).insert(dados)
        return db(TABELA2).where({ id }).first()
    },

    //atualizar nome ou email
    async update(id, dados) {
        const linhas = await db(TABELA2).where({ id }).update(dados)
        if (linhas === 0) return null
        return db(TABELA2).where({ id }).first()
    },

    // Remove um usuário
    async delete(id) {
        const linhas = await db(TABELA2).where({ id }).del()
        return linhas > 0
    },

    // quantos comentários escritos por aquele usuário
    async contarComen(usuarioId) {
        const resultado = await db(TABELATER)
            .where({ usuario_id: usuarioId })
            .count("id as total")
            .first()
        return resultado ? resultado.total : 0
    },

    // quantos posts escritos por aquele usuario
    async contarPosts(autorId){
        const resultado = await db(TABELASEC)
            .where({ autor_id: autorId })
            .count("id as total")
            .first()
        return resultado ? resultado.total : 0
    }
}