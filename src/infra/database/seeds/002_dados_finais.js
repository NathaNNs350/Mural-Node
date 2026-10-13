// src/infra/database/seeds/001_dados_iniciais.js

exports.seed = async function(knex) {
  await knex("comentarios").del()
  await knex("posts").del()
  await knex("categorias").del()
  await knex("usuarios").del()

  await knex("categorias").insert([
    { id: 1, nome: "Memes e Zoeira" },
    { id: 2, nome: "Avisos da Diretoria" },
    { id: 3, nome: "Esportes e Jogos" },
    { id: 4, nome: "Estudos e Pânico" }
  ])

  await knex("usuarios").insert([
    { id: 1, nome: "Casimiro Miguel", email: "caze@twitch.com" },
    { id: 2, nome: "Luva de Pedreiro", email: "receba@gracasadeus.com" },
    { id: 3, nome: "Padre Kelmon", email: "kelmon@debatelol.com" },
    { id: 4, nome: "Xandão o Juiz", email: "xandao@stf.com" },
    { id: 5, nome: "Rita Cadillac", email: "rita@velhaguarda.com" },
    { id: 6, nome: "Caneta Azul", email: "manoel@azul.com" },
    { id: 7, nome: "Boca de Rosa", email: "bianca@pink.com" },
    { id: 8, nome: "Vovó Garoto", email: "vovo@gamer.com" },
    { id: 9, nome: "Jacinto Leite", email: "jacinto@correr.com" },
    { id: 10, nome: "Toninho Tornado", email: "calica@silencio.com" }
  ])

  await knex("posts").insert([
    { id: 1, titulo: "Isso é mto the flash, cara!", conteudo: "Alguém viu quem passou correndo no corredor da escola? O bicho tava voando, maneiro demais.", publicado: true, autor_id: 1, categoria_id: 1 },
    { id: 2, titulo: "RECEBA! O melhor gol do recreio", conteudo: "Graças a Deus pai, gol de calcanhar no meio da quadra de terra. SIU!", publicado: true, autor_id: 2, categoria_id: 3 },
    { id: 3, titulo: "Falta de respeito com o padre na aula", conteudo: "Absurdo o que fizeram na aula de religião hoje, não respeitaram a tradição e o calvário.", publicado: true, autor_id: 3, categoria_id: 2 },
    { id: 4, titulo: "Cuidado com o bloqueio da conta", conteudo: "Quem faltar na prova de recuperação amanhã vai ter o perfil bloqueado pelo sistema, tá ok?", publicado: true, autor_id: 4, categoria_id: 4 },
    { id: 5, titulo: "Caneta azul, azul caneta...", conteudo: "Perdi minha caneta azul favorita na sala 3, quem achou por favor devolva.", publicado: true, autor_id: 6, categoria_id: 1 },
    { id: 6, titulo: "Maquiagem social para a festa junina", conteudo: "Dicas rápidas de como fazer aquela base reboco que não derrete nem no sol de meio-dia.", publicado: true, autor_id: 7, categoria_id: 1 },
    { id: 7, titulo: "Estratégias de speedrun na prova de matemática", conteudo: "Como chutar todas as alternativas da prova em menos de 2 minutos e tirar nota 5.", publicado: true, autor_id: 8, categoria_id: 4 },
    { id: 8, titulo: "Tô calmo, tá? Tô super calmo!", conteudo: "Quem foi o palhaço que escondeu minha mochila na sala dos professores? Aparece desgraça!", publicado: true, autor_id: 10, categoria_id: 1 },
    { id: 9, titulo: "Almoço de hoje tava tankável?", conteudo: "A carne misteriosa de hoje parecia sola de bota velha, juro pra vocês.", publicado: true, autor_id: 5, categoria_id: 2 },
    { id: 10, titulo: "Xablau no corrimão da escada", conteudo: "Manobra radical nova na escada principal, quem colar lá embaixo vai ver o tombo.", publicado: true, autor_id: 9, categoria_id: 3 },
    // Rascunhos (publicado = false)
    { id: 11, titulo: "Operação Secreta: Fuga da Aula de História (Rascunho)", conteudo: "Plano detalhado de como pular o muro lateral sem o inspetor ver às 14:30.", publicado: false, autor_id: 2, categoria_id: 2 },
    { id: 12, titulo: "Venda de gabarito superfaturado (Rascunho)", conteudo: "Negociando as respostas da prova trimestral de física na base do PIX.", publicado: false, autor_id: 10, categoria_id: 4 }
  ])

  await knex("comentarios").insert([
    { id: 1, texto: "Lá ele mil vezes, rapaz!", post_id: 1, usuario_id: 2 },
    { id: 2, texto: "Que homem magnífico, receba!", post_id: 2, usuario_id: 1 },
    { id: 3, texto: "Isso é um absurdo, meu senhor!", post_id: 3, usuario_id: 4 },
    { id: 4, texto: "Mandou soltar o CPF do meliante.", post_id: 4, usuario_id: 6 },
    { id: 5, texto: "A caneta azul ficou famosa na Colômbia.", post_id: 5, usuario_id: 3 },
    { id: 6, texto: "Perfeito, amei as dicas de milhões!", post_id: 6, usuario_id: 8 },
    { id: 7, texto: "Speedrun any% glitchless de reprovação.", post_id: 7, usuario_id: 1 },
    { id: 8, texto: "Calma paizão, respira fundo kkkkkk", post_id: 8, usuario_id: 2 },
    { id: 9, texto: "Intankável o bostil da cantina.", post_id: 9, usuario_id: 9 },
    { id: 10, texto: "Foi dento demais essa manobra!", post_id: 10, usuario_id: 5 },
    { id: 11, texto: "Cuidado que o Xandão tá de olho nesse plano aí.", post_id: 1, usuario_id: 4 },
    { id: 12, texto: "Obrigado pelas risadas, melhor post do dia.", post_id: 2, usuario_id: 7 },
    { id: 13, texto: "Alguém me empresta 2 reais para o salgado?", post_id: 9, usuario_id: 8 },
    { id: 14, texto: "Bora Bill, não inventa moda.", post_id: 10, usuario_id: 6 },
    { id: 15, texto: "Essa escola tá parecendo um circo.", post_id: 3, usuario_id: 10 }
  ])
}