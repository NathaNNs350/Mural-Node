exports.up = function (knex) {
    return knex.schema.createTable("posts", function (table) {
        table.increments("id").primary()
        table.string("titulo").notNullable()
        table.string("conteudo").notNullable()
        table.boolean("publicado").defaultTo(false).notNullable()
        table.timestamp("criado_em").defaultTo(knex.fn.now())
        table.integer("autor_id").references("id").inTable("usuarios")
        table.integer("categoria_id").references("id").inTable("categorias")
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("posts")
};