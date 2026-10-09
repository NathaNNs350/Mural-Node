const db = require("../infra/database")
const TABELA = "comentarios"

module.exports = {
    // Busca um comentário por ID
    async show(id) {
        return db(TABELA).where({ id }).first()
    },

    // Lista os comentários de um post específico trazendo o nome do usuário
    async listarPorPost(postId) {
        return db(TABELA)
            .innerJoin("usuarios", "comentarios.usuario_id", "usuarios.id")
            .select(
                "comentarios.id",
                "comentarios.texto",
                "comentarios.criado_em as criadoEm",
                "comentarios.usuario_id as usuario_id",
                "usuarios.nome as usuario_nome"
            )
            .where("comentarios.post_id", postId)
            .orderBy("comentarios.criado_em", "asc")
    },

    // Inserção de novo comentário
    async create(dados) {
        const [id] = await db(TABELA).insert(dados)
        return db(TABELA)
            .innerJoin("usuarios", "comentarios.usuario_id", "usuarios.id")
            .select(
                "comentarios.id",
                "comentarios.texto",
                "comentarios.criado_em as criadoEm",
                "comentarios.usuario_id as usuario_id",
                "usuarios.nome as usuario_nome"
            )
            .where("comentarios.id", id)
            .first()
    },

    // Edita um comentário específico
    async update(id, dados) {
        const linhas = await db(TABELA).where({ id }).update(dados)
        if (linhas === 0) return null
        return this.show(id)
    },

    // Remove um comentário pelo ID
    async delete(id) {
        const linhas = await db(TABELA).where({ id }).del()
        return linhas > 0
    }
}