// src/repositories/categorias.repository.js
const db = require("../infra/database")
//Tabela Principal
const TABELA = "comentarios"

module.exports = {

    async show(id) {
        return db(TABELA).where({ id }).first()
    },

    // Edita um Comentário específico
    async update(id, dados) {
        const texto = await db(TABELA).where({ id }).update(dados)
        if (texto === 0) return null
        return db(TABELA).where({ id }).first()
    },

    // Remove um Comentário pelo id
    async delete(id) {
        const coment = await db(TABELA).where({ id }).del()
        return coment > 0
    },
}