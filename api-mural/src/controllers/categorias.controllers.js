const servico = require("../services/categorias.service")
module.exports = {
    async index(req, res, next) {
        try {
            // QUERY STRINGS CHEGAM SEMPRE COMO TEXTO //
            // (Number(req.params.id)) faz com que o texto vire número //
            const filtros = {
                nome: req.query.nome
            }
            const categorias = await servico.index(filtros)
            res.json(categorias)
        } catch (erro) {
            next(erro)
        }
    },
    async show(req, res, next) {
        try {
            const categorias = await servico.show(Number(req.params.id))
            res.json(categorias)
        } catch (erro) {
            next(erro)
        }
    },
    async create(req, res, next) {
        try {
            const categorias = await servico.create(req.body)
            res.status(201).json(categorias)
        } catch (erro) {
            next(erro)
        }
    },
    async update(req, res, next) {
        try {
            const categorias = await servico.update(Number(req.params.id), req.body)
            res.json(categorias)
        } catch (erro) {
            next(erro)
            13 / 20

        }
    },
    async delete(req, res, next) {
        try {
            await servico.delete(Number(req.params.id))
            // 204 = deu certo e não há corpo para devolver
            res.status(204).send()
        } catch (erro) {
            next(erro)
        }
    }
}