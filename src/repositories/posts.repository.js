const db = require("../infra/database");

const TABELA = "posts";

const COLUNAS = [
  "posts.id",
  "posts.titulo",
  "posts.conteudo",
  "posts.publicado",
  "posts.criado_em as criadoEm",
  "posts.autor_id as autor_id",
  "usuarios.nome as autor_nome",
  "posts.categoria_id as categoria_id",
  "categorias.nome as categoria_nome"
];

module.exports = {
  async index(filtros = {}) {
    const consulta = db(TABELA)
      .innerJoin("usuarios", "posts.autor_id", "usuarios.id")
      .innerJoin("categorias", "posts.categoria_id", "categorias.id")
      .leftJoin("comentarios", "comentarios.post_id", "posts.id")
      .select(...COLUNAS)
      .count("comentarios.id as totalComentarios") // <-- Sem usar db.raw()
      .groupBy("posts.id");

    if (filtros.publicado !== undefined) {
      consulta.where("posts.publicado", filtros.publicado);
    }

    if (filtros.categoriaId) {
      consulta.where("posts.categoria_id", filtros.categoriaId);
    }

    if (filtros.autorId) {
      consulta.where("posts.autor_id", filtros.autorId);
    }

    if (filtros.busca) {
      consulta.where((q) => {
        q.where("posts.titulo", "like", `%${filtros.busca}%`)
         .orWhere("posts.conteudo", "like", `%${filtros.busca}%`);
      });
    }

    if (filtros.limite) {
      consulta.limit(filtros.limite).offset(filtros.deslocamento || 0);
    }

    return consulta.orderBy("posts.criado_em", "desc");
  },

  async show(id) {
    return db(TABELA)
      .innerJoin("usuarios", "posts.autor_id", "usuarios.id")
      .innerJoin("categorias", "posts.categoria_id", "categorias.id")
      .leftJoin("comentarios", "comentarios.post_id", "posts.id")
      .select(...COLUNAS)
      .count("comentarios.id as totalComentarios") // <-- Sem usar db.raw()
      .where("posts.id", id)
      .groupBy("posts.id")
      .first();
  },

  async create(dados) {
    const [id] = await db(TABELA).insert(dados);
    return this.show(id);
  },

  async update(id, dados) {
    const linhas = await db(TABELA).where({ id }).update(dados);
    if (linhas === 0) return null;
    return this.show(id);
  },

  async delete(id) {
    const linhas = await db(TABELA).where({ id }).del();
    return linhas > 0;
  }
};