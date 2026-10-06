//Arquivo de serviços da tabela Categorias
const repositorio = require("../repositories/categorias.repository")
const db = require("../infra/database")
const { criarErro } = require("./erros")

module.exports = {
    async index(filtros) {
        return repositorio.index(filtros)
    },
    async show(id) {
        const categoria = await repositorio.show(id)
        if (!categoria) {
            throw criarErro("Categoria não encontrada", 404)
        }
        return categoria
    },
    async create(dados) {
        await validar(dados)
        return repositorio.create(dados)
    },
    async update(id, dados) {
        // O livro precisa existir antes de ser alterado
        const categoria = await repositorio.show(id)
        if (!categoria) {
            throw criarErro("Categoria não encontrada", 404)
        }
        await validar(dados)
        return repositorio.update(id, dados)
    },
    async delete(id) {
        const categoria = await repositorio.show(id)
        if (!categoria) {
            throw criarErro("Categoria não encontrada", 404)
        }
        return repositorio.delete(id)
    }
}
// --- Função interna: não faz parte da API do serviço ---
// Validação compartilhada entre create e update
async function validar(dados) {
    const { nome } = dados
    if (!nome || nome.trim().length < 0) {
        throw criarErro("O Nome é obrigatório e não pode ser nulo", 400)
    }
}