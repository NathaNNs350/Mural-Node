// Arquivo que gera os erros e lida com eles //

function criarErro(mensagem, status) {
const erro = new Error(mensagem)
erro.status = status
return erro
}
module.exports = { criarErro }