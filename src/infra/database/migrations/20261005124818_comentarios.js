exports.up = function (knex) {
    return knex.schema.createTable("comentarios", function (table) {
        table.increments("id").primary()
        table.string("texto").notNullable()
        table.dateTime("criado_em").notNullable().defaultTo(knex.fn.now());
        table.integer("post_id").notNullable().references('id').inTable('posts')
        table.integer("usuario_id").notNullable().references('id').inTable('usuarios')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable("comentarios")
};