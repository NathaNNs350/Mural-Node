const servico = require("../services/comentarios.service")

const {
    criarStatus,
    badRequest,
    naoEncontrado,
    conflito,
    erroInterno
} = require("../services/estado")

module.exports = {

    // QUERY STRINGS CHEGAM SEMPRE COMO TEXTO //
    // (Number(req.params.id)) faz com que o texto vire número //

    async update(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                throw badRequest()
            }
            
            const comentarios = await servico.update(id, req.body)
            res.status(200).json(comentarios)
        } catch (estado) {
            next(estado)
        }
    },

    async delete(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                throw badRequest()
            }    

            await servico.delete(id)
            res.status(204).send()
        } catch (estado) {
            next(estado)
        }
    }
}