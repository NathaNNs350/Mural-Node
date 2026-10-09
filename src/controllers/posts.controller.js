const servico = require("../services/posts.service")

const {
    badRequest
} = require("../services/estado")

module.exports = {

    // QUERY STRINGS CHEGAM SEMPRE COMO TEXTO //
    // (Number(req.params.id)) faz com que o texto vire número //

    async index(req, res, next) {
        try {
            // Trata e converte os filtros vindos na query string (?categoria=...&autor=...&pagina=...)
            const filtros = {
                categoriaId: req.query.categoria ? Number(req.query.categoria) : undefined,
                autorId: req.query.autor ? Number(req.query.autor) : undefined,
                busca: req.query.busca,
                limite: req.query.limite ? Number(req.query.limite) : undefined,
                deslocamento: req.query.pagina && req.query.limite
                    ? (Number(req.query.pagina) - 1) * Number(req.query.limite)
                    : undefined
            }

            const posts = await servico.index(filtros)
            res.status(200).json(posts)
        } catch (estado) {
            next(estado)
        }
    },

    async rascunhos(req, res, next) {
        try {
            const filtros = {
                categoriaId: req.query.categoria ? Number(req.query.categoria) : undefined,
                autorId: req.query.autor ? Number(req.query.autor) : undefined,
                busca: req.query.busca,
                limite: req.query.limite ? Number(req.query.limite) : undefined,
                deslocamento: req.query.pagina && req.query.limite
                    ? (Number(req.query.pagina) - 1) * Number(req.query.limite)
                    : undefined
            }

            const rascunhos = await servico.rascunhos(filtros)
            res.status(200).json(rascunhos)
        } catch (estado) {
            next(estado)
        }
    },

    async show(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                throw badRequest("ID inválido")
            }

            const post = await servico.show(id)
            res.status(200).json(post)
        } catch (estado) {
            next(estado)
        }
    },

    async create(req, res, next) {
        try {
            const post = await servico.create(req.body)
            res.status(201).json(post)
        } catch (estado) {
            next(estado)
        }
    },

    async update(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                throw badRequest("ID inválido")
            }

            const post = await servico.update(id, req.body)
            res.status(200).json(post)
        } catch (estado) {
            next(estado)
        }
    },

    async alterarPublicacao(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                throw badRequest("ID inválido")
            }

            const { publicado } = req.body
            const post = await servico.alterarPublicacao(id, publicado)
            res.status(200).json(post)
        } catch (estado) {
            next(estado)
        }
    },

    async delete(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                throw badRequest("ID inválido")
            }

            await servico.delete(id)
            res.status(204).send()
        } catch (estado) {
            next(estado)
        }
    }
}