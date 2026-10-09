const repositorio = require("../repositories/posts.repository")
const comentariosRepository = require("../repositories/comentarios.repository")
const db = require("../infra/database")
const {
  badRequest,
  naoEncontrado,
  conflito
} = require("./estado")

module.exports = {
  // Lista todos os posts (apenas publicados por padrão, aceita filtros)
  async index(filtros = {}) {
    const novosFiltros = {
      ...filtros,
      publicado: filtros.publicado !== undefined ? filtros.publicado : true
    }
    const posts = await repositorio.index(novosFiltros)
    return posts.map(formatarPost)
  },

  // Lista apenas os rascunhos (não publicados)
  async rascunhos(filtros = {}) {
    const posts = await repositorio.index({ ...filtros, publicado: false })
    return posts.map(formatarPost)
  },

  // Detalha um post específico
  async show(id) {
    const post = await repositorio.show(id)
    if (!post) {
      throw naoEncontrado("Post não encontrado")
    }
    return formatarPost(post)
  },

  // Cria um novo post (nasce como rascunho)
  async create(dados) {
    await validar(dados)

    const novoPostDados = {
      titulo: dados.titulo,
      conteudo: dados.conteudo,
      autor_id: dados.autor_id,
      categoria_id: dados.categoria_id,
      publicado: false
    }

    const postCriado = await repositorio.create(novoPostDados)
    return formatarPost(postCriado)
  },

  // Atualiza um post
  async update(id, dados) {
    const postExistente = await repositorio.show(id)
    if (!postExistente) {
      throw naoEncontrado("Post não encontrado")
    }

    await validar(dados, true)

    const dadosAtualizacao = {}
    if (dados.titulo !== undefined) dadosAtualizacao.titulo = dados.titulo
    if (dados.conteudo !== undefined) dadosAtualizacao.conteudo = dados.conteudo
    if (dados.categoria_id !== undefined) dadosAtualizacao.categoria_id = dados.categoria_id

    const postAtualizado = await repositorio.update(id, dadosAtualizacao)
    return formatarPost(postAtualizado)
  },

  // Publica ou volta para rascunho
  async alterarPublicacao(id, publicado) {
    const post = await repositorio.show(id)
    if (!post) {
      throw naoEncontrado("Post não encontrado")
    }

    if (typeof publicado !== "boolean") {
      throw badRequest("O campo 'publicado' deve ser um booleano (true ou false)")
    }

    const postAtualizado = await repositorio.update(id, { publicado })
    return formatarPost(postAtualizado)
  },

  // Remove um post e seus comentários vinculados
  async delete(id) {
    const post = await repositorio.show(id)
    if (!post) {
      throw naoEncontrado("Post não encontrado")
    }

    // Remove comentários vinculados antes de remover o post
    await db("comentarios").where({ post_id: id }).del()

    return repositorio.delete(id)
  },

  // Lista comentários de um post
  async listarComentarios(postId) {
    const post = await repositorio.show(postId)
    if (!post) {
      throw naoEncontrado("Post não encontrado")
    }

    const comentarios = await comentariosRepository.listarPorPost(postId)
    return comentarios.map(formatarComentario)
  },

  // Cria um comentário em um post
  async criarComentario(postId, dados) {
    const { texto, usuario_id } = dados

    const post = await repositorio.show(postId)
    if (!post) {
      throw naoEncontrado("Post não encontrado")
    }

    // Regra 2: Só é possível comentar em post publicado (409)
    if (!post.publicado) {
      throw conflito("Não é possível comentar em um post que ainda é rascunho")
    }

    // Regra 4: Texto do comentário com no mínimo 3 caracteres (400)
    if (!texto || texto.trim().length < 3) {
      throw badRequest("O texto do comentário precisa ter no mínimo 3 caracteres")
    }

    if (!usuario_id) {
      throw badRequest("O usuario_id é obrigatório")
    }

    const usuario = await db("usuarios").where({ id: usuario_id }).first()
    if (!usuario) {
      throw badRequest("Usuário informado não existe")
    }

    const novoComentario = await comentariosRepository.create({
      texto,
      post_id: postId,
      usuario_id
    })

    return formatarComentario(novoComentario)
  }
}

// Funções Auxiliares de Formatação

function formatarPost(post) {
  if (!post) return null
  return {
    id: post.id,
    titulo: post.titulo,
    conteudo: post.conteudo,
    publicado: Boolean(post.publicado),
    criadoEm: post.criadoEm,
    autor: {
      id: post.autor_id,
      nome: post.autor_nome
    },
    categoria: {
      id: post.categoria_id,
      nome: post.categoria_nome
    },
    totalComentarios: Number(post.totalComentarios || 0)
  }
}

function formatarComentario(comentario) {
  if (!comentario) return null
  return {
    id: comentario.id,
    texto: comentario.texto,
    criadoEm: comentario.criadoEm,
    autor: {
      id: comentario.usuario_id,
      nome: comentario.usuario_nome
    }
  }
}

async function validar(dados, isUpdate = false) {
  const { titulo, conteudo, autor_id, categoria_id } = dados

  if (!isUpdate || titulo !== undefined) {
    if (!titulo || titulo.trim().length < 5) {
      throw badRequest("O título é obrigatório e deve ter no mínimo 5 caracteres")
    }
  }

  if (!isUpdate || conteudo !== undefined) {
    if (!conteudo || conteudo.trim().length < 20) {
      throw badRequest("O conteúdo é obrigatório e deve ter no mínimo 20 caracteres")
    }
  }

  if (!isUpdate) {
    if (!autor_id) {
      throw badRequest("O autor_id é obrigatório")
    }
    const autor = await db("usuarios").where({ id: autor_id }).first()
    if (!autor) {
      throw badRequest("Autor informado não existe")
    }
  }

  if (!isUpdate || categoria_id !== undefined) {
    if (!categoria_id) {
      throw badRequest("O categoria_id é obrigatório")
    }
    const categoria = await db("categorias").where({ id: categoria_id }).first()
    if (!categoria) {
      throw badRequest("Categoria informada não existe")
    }
  }
}