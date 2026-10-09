//Arquivo de serviços da tabela Categorias
const repositorio = require("../repositories/comentarios.repository")
const db = require("../infra/database")
const { 
    criarStatus,
    badRequest,
    naoEncontrado,
    conflito,
    erroInterno    
} = require("../services/estado")

module.exports = {
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
    }
}

// --- Função interna: não faz parte da API do serviço ---
// Validação compartilhada entre create e update
async function validar(dados) {
    const { texto } = dados
    if (!texto || texto.trim().length === 0) {
        throw badRequest("O Campo de Texto está vazio. Por favor, escreva algo")
    }
}