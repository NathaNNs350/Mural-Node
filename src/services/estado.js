// Arquivo que gera os erros e lida com eles //

function criarStatus(mensagem, status = 500) {
    const estado = new Error(mensagem)
    estado.status = status

    return estado
}

//ESTADOS//

//400 - A requisição não pode ser completa por ser inválida
const badRequest = (msg = 'Requisição inválida') => criarStatus(msg, 400)
//404 - A requisição não pode ser completada por conta de não encontrar o conteúdo requisitado
const naoEncontrado = (msg = 'Recurso não encontrado') => criarStatus(msg, 404)
//409 - A requisição de adição não pode ser completa pois os dados conflitam com dados já existentes
const conflito = (msg = 'Conflito de dados') => criarStatus(msg, 409)
//500 - A requisição não pode ser completa porque o servidor encontrou um erro
const erroInterno = (msg = 'Erro interno do servidor') => criarStatus(msg, 500)

module.exports = {
    criarStatus,
    badRequest,
    naoEncontrado,
    conflito,
    erroInterno
}