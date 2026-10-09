const servico = require("../services/posts.service")
const { badRequest } = require("../services/estado")

module.exports = {
    async index(req, res, next) {
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
    },

    async listarComentarios(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                throw badRequest("ID inválido")
            }

            const comentarios = await servico.listarComentarios(id)
            res.status(200).json(comentarios)
        } catch (estado) {
            next(estado)
        }
    },

    async criarComentario(req, res, next) {
        try {
            const id = Number(req.params.id)
            if (isNaN(id) || id <= 0) {
                throw badRequest("ID inválido")
            }

            const comentario = await servico.criarComentario(id, req.body)
            res.status(201).json(comentario)
        } catch (estado) {
            next(estado)
        }
    }
}