// src/infra/database/index.js
const knex = require("knex")
const configuracao = require("../../../knexfile")
const mode = process.env.MODE || "development"

// Cria a conexão usando o ambiente de desenvolvimento
const db = knex(configuracao[mode])
module.exports = db