//Tabela Categorias

//Modelamento da tabela
exports.up = function (knex) {
    return knex.schema.createTable("categorias", function (table) {
        table.increments("id").primary()
        table.string("nome").notNullable()
    })
};

//Método de derrubar a tabela
exports.down = function (knex) {
    return knex.schema.dropTable("categorias")
};