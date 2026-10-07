//Arquivo de serviços da tabela Categorias
const repositorio = require("../repositories/categorias.repository")
const db = require("../infra/database")
const { 
    criarStatus,
    badRequest,
    naoEncontrado,
    conflito,
    erroInterno    
} = require("../services/estado")

module.exports = {
    async index(filtros) {
        return repositorio.index(filtros)
    },

    async show(id) {
        const categoria = await repositorio.show(id)
        if (!categoria) {
            throw naoEncontrado()
        }
        return categoria
    },

    async create(dados) {
        await validar(dados)
        return repositorio.create(dados)
    },

    async update(id, dados) {
        // A Categoria precisa existir antes de ser alterado
        const categoria = await repositorio.show(id)
        if (!categoria) {
            throw naoEncontrado()
        }
        await validar(dados)
        return repositorio.update(id, dados)
    },

    async delete(id) {
        const categoria = await repositorio.show(id)
        if (!categoria) {
            throw naoEncontrado()
        }

        const contagem = await repositorio.contarPosts(id)
        if (contagem > 0) {
            // TODO
            throw conflito("Deu ruim essa bagaça")
        }

        return repositorio.delete(id)
    }
}

// --- Função interna: não faz parte da API do serviço ---
// Validação compartilhada entre create e update
async function validar(dados) {
    const { nome } = dados
    if (!nome || nome.trim().length < 0) {
        throw badRequest("O Nome é obrigatório e não pode ser nulo")
    }
}