const repositorio = require("../repositories/posts.repository");
const db = require("../infra/database");
const {
  badRequest,
  naoEncontrado,
  conflito
} = require("./estado");

module.exports = {
  // Lista todos os posts (apenas publicados por padrão, aceita filtros)
  async index(filtros = {}) {
    // Por padrão, a listagem pública traz apenas posts publicados
    const novosFiltros = {
      ...filtros,
      publicado: filtros.publicado !== undefined ? filtros.publicado : true
    };
    const posts = await repositorio.index(novosFiltros);
    return posts.map(formatarPost);
  },

  // Lista apenas os rascunhos (não publicados)
  async rascunhos(filtros = {}) {
    const posts = await repositorio.index({ ...filtros, publicado: false });
    return posts.map(formatarPost);
  },

  // Detalha um post específico com autor, categoria e total de comentários
  async show(id) {
    const post = await repositorio.show(id);
    if (!post) {
      throw naoEncontrado("Post não encontrado");
    }
    return formatarPost(post);
  },

  // Cria um novo post (nasce como rascunho: publicado = false)
  async create(dados) {
    await validar(dados);

    // Regra 1: Todo post nasce como rascunho (publicado = false)
    const novoPostDados = {
      titulo: dados.titulo,
      conteudo: dados.conteudo,
      autor_id: dados.autor_id,
      categoria_id: dados.categoria_id,
      publicado: false
    };

    const postCriado = await repositorio.create(novoPostDados);
    return formatarPost(postCriado);
  },

  // Atualiza título, conteúdo ou categoria
  async update(id, dados) {
    const postExistente = await repositorio.show(id);
    if (!postExistente) {
      throw naoEncontrado("Post não encontrado");
    }

    await validar(dados, true); // true indica que é atualização parcial/completa

    const dadosAtualizacao = {};
    if (dados.titulo !== undefined) dadosAtualizacao.titulo = dados.titulo;
    if (dados.conteudo !== undefined) dadosAtualizacao.conteudo = dados.conteudo;
    if (dados.categoria_id !== undefined) dadosAtualizacao.categoria_id = dados.categoria_id;

    const postAtualizado = await repositorio.update(id, dadosAtualizacao);
    return formatarPost(postAtualizado);
  },

  // Publica o post ou o devolve para rascunho (PATCH /api/posts/:id/publicacao)
  async alterarPublicacao(id, publicado) {
    const post = await repositorio.show(id);
    if (!post) {
      throw naoEncontrado("Post não encontrado");
    }

    if (typeof publicado !== "boolean") {
      throw badRequest("O campo 'publicado' deve ser um booleano (true ou false)");
    }

    const postAtualizado = await repositorio.update(id, { publicado });
    return formatarPost(postAtualizado);
  },

  // Remove um post (e seus comentários via CASCADE do banco ou manipulação)
  async delete(id) {
    const post = await repositorio.show(id);
    if (!post) {
      throw naoEncontrado("Post não encontrado");
    }

    return repositorio.delete(id);
  }
};

// --- Funções Auxiliares e Validações ---

// Formata o retorno para aninhar os dados de autor e categoria conforme o Modelo de Dados da especificação
function formatarPost(post) {
  if (!post) return null;

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
  };
}

// Valida os dados de entrada
async function validar(dados, isUpdate = false) {
  const { titulo, conteudo, autor_id, categoria_id } = dados;

  // Regra 3: titulo (mínimo 5 caracteres)
  if (!isUpdate || titulo !== undefined) {
    if (!titulo || titulo.trim().length < 5) {
      throw badRequest("O título é obrigatório e deve ter no mínimo 5 caracteres");
    }
  }

  // Regra 3: conteudo (mínimo 20 caracteres)
  if (!isUpdate || conteudo !== undefined) {
    if (!conteudo || conteudo.trim().length < 20) {
      throw badRequest("O conteúdo é obrigatório e deve ter no mínimo 20 caracteres");
    }
  }

  // Validação de existência do Autor (apenas na criação)
  if (!isUpdate) {
    if (!autor_id) {
      throw badRequest("O autor_id é obrigatório");
    }
    const autor = await db("usuarios").where({ id: autor_id }).first();
    if (!autor) {
      throw badRequest("Autor informado não existe");
    }
  }

  // Validação de existência da Categoria
  if (!isUpdate || categoria_id !== undefined) {
    if (!categoria_id) {
      throw badRequest("O categoria_id é obrigatório");
    }
    const categoria = await db("categorias").where({ id: categoria_id }).first();
    if (!categoria) {
      throw badRequest("Categoria informada não existe");
    }
  }
}