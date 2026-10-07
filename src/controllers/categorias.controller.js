const servico = require("../services/categorias.service")

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

    async index(req, res, next) {
        try {
            const filtros = {
                nome: req.query.nome
            }
            
            const categorias = await servico.index(filtros)
            res.status(200).json(categorias)
        } catch (estado) {
            next(estado)
        }
    },

    async show(req, res, next) {
        try {
            const id = Number(req.params.id)
            // Valida se o ID não é um número válido ou se é menor/igual a zero
            if (isNaN(id) || id <= 0) {
                throw badRequest()
            }

            const categoria = await servico.show(id)
            return res.status(200).json(categoria)
        } catch (estado) {
            next(estado);
        }
    },

    async create(req, res, next) {
        try {
            const categorias = await servico.create(req.body)
            res.status(201).json(categorias)
        } catch (estado) {
            next(estado)
        }
    },

    async update(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                throw badRequest()
            }
            
            const categorias = await servico.update(id, req.body)
            res.status(200).json(categorias)
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