const repositorio = require("../repositories/comentarios.repository")
const { 
    badRequest,
    naoEncontrado
} = require("./estado")

module.exports = {
    async update(id, dados) {
        const comentario = await repositorio.show(id)
        if (!comentario) {
            throw naoEncontrado("Comentário não encontrado")
        }
        await validar(dados)
        return repositorio.update(id, dados)
    },

    async delete(id) {
        const comentario = await repositorio.show(id)
        if (!comentario) {
            throw naoEncontrado("Comentário não encontrado")
        }
        return repositorio.delete(id)
    }
}

// Validação compartilhada
async function validar(dados) {
    const { texto } = dados
    if (!texto || texto.trim().length < 3) {
        throw badRequest("O texto do comentário precisa ter no mínimo 3 caracteres")
    }
}