const servico = require("../services/usuarios.service")

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
            const usuarios = await servico.index(filtros)
            res.status(200).json(usuarios)
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

            const usuario = await servico.show(id)
            return res.status(200).json(usuario)
        } catch (estado) {
            next(estado);
        }
    },

    async create(req, res, next) {
        try {
            const usuarios = await servico.create(req.body)
            res.status(201).json(usuarios)
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
            
            const usuarios = await servico.update(id, req.body)
            res.status(200).json(usuarios)
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