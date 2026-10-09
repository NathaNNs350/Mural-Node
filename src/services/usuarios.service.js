//Arquivo de serviços da tabela usuarios
const repositorio = require("../repositories/usuarios.repository")
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
        const usuario = await repositorio.show(id)
        if (!usuario) {
            throw naoEncontrado()
        }
        return usuario
    },

    async create(dados) {
        await validar(dados)
        return repositorio.create(dados)
    },

    async update(id, dados) {
        // o usuario precisa existir antes de ser alterado
        const usuario = await repositorio.show(id)
        if (!usuario) {
            throw naoEncontrado()
        }
        await validar(dados)
        return repositorio.update(id, dados)
    },

    async delete(id) {
        const usuario = await repositorio.show(id)
        if (!usuario) {
            throw naoEncontrado()
        }

        //consulta a quantidade de posts e comentários em ao mesmo tempo
        const [contagem, contagem2] = await Promise.all([
        repositorio.contarPosts(id),
        repositorio.contarComen(id)
        ])

        if (contagem > 0) {
            throw conflito("Não é possível excluir o usuário pois ele possui posts vinculados.")
        }
        if (contagem2 > 0) {
            throw conflito("Não é possível excluir o usuário pois ele possui comentários vinculados.")
        } 

        return repositorio.delete(id)
    }
}

// --- Função interna: não faz parte da API do serviço ---
// Validação compartilhada entre create e update
async function validar(dados) {
    const { nome } = dados
    if (!nome || nome.trim().length === 0) {
        throw badRequest("O Nome é obrigatório e não pode ser nulo")
    }
    const { email } = dados;
    if (!email || email.trim().length === 0) {
        throw badRequest("O Email é obrigatório e não pode ser nulo")
    }
}