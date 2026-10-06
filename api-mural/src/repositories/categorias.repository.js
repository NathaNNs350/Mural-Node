// src/repositories/categorias.repository.js
const db = require("../infra/database")

const TABELA = "20261005123852_categorias.js"

module.exports = {
    // Lista todas as categorias
    async index() {
        return db(TABELA).select("*").orderBy("nome", "asc")
    },

    // Busca uma categoria específica pelo id
    async show(id) {
        return db(TABELA).where({ id }).first()
    },

    // Cria uma nova categoria
    async create(dados) {
        const [id] = await db(TABELA).insert(dados)
        return db(TABELA).where({ id }).first()
    },

    // Atualiza uma categoria existente
    async update(id, dados) {
        const linhas = await db(TABELA).where({ id }).update(dados)
        if (linhas === 0) return null
        return db(TABELA).where({ id }).first()
    },

    // Remove uma categoria pelo id
    async delete(id) {
        const linhas = await db(TABELA).where({ id }).del()
        return linhas > 0
    },

    // Conta quantos posts estão associados a uma categoria (usado para regra de negócio ao remover)
    async contarPosts(categoriaId) {
        const resultado = await db("posts")
            .where({ categoria_id: categoriaId })
            .count("id as total")
            .first()
        return resultado ? resultado.total : 0
    }
}