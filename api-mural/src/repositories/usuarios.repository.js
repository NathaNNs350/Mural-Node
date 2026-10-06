// src/repositories/usuarios.repository.js
const db = require("../infra/database")

const TABELA2 = "20261005124004_usuarios.js"

module.exports = {
    //lista todos os usuarios
    async index() {
        return db(TABELA2).select("*").orderBy("nome", "asc")
    },

    //buscar usuário expecifico
    async show(id) {
        return db(TABELA2).where({ id }).first()
    },

    //cadastrar um usuario
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

    //Remove um usuário
     async delete(id) {
        const linhas = await db(TABELA2).where({ id }).del()
        return linhas > 0
     },

     //Comentários escritos por aquele usuário
    async contarPosts(usuarioId) {
        const resultado = await db("comentarios")
            .where({ usuario_id: usuarioId })
            .count("id as total")
            .first()
        return resultado ? resultado.total : 0
    }
}