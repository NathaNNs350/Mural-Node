//Arquivo 1 de Seeds.
//Seeds usadas para Teste. Não serão usadas na API final.
exports.seed = async function (knex) {
  // Limpa as tabelas antes de inserir (ordem inversa das dependências)
  await knex("comentarios").del()
  await knex("posts").del()
  await knex("usuarios").del()
  await knex("categorias").del()

  //Preenchimento da tabela Categorias
  await knex("categorias").insert([
    { id: 1, nome: "Noticia" },
    { id: 2, nome: "Futebol" },
    { id: 3, nome: "Animes" },
    { id: 4, nome: "Politica" }
  ])

  //Preenchimento da tabela Usuários
  await knex("usuarios").insert([
    {id: 1, nome: "Oswaldo Lima", email: "osvoff69@escola.com"},
    {id: 2, nome: "Ednaldo Pereira", email: "ednaldopereiracomercial@gmail.com"},
    {id: 3, nome: "Manuel Gomes", email: "contatomanoelgomesbr@gmail.com"},
    {id: 4, nome: "Rogério Skylab", email: "solange.venturi@uol.com.br"}
  ])

  //Preenchimento da tabela Posts
  await knex("posts").insert([
    {
      id: 1, 
      titulo: "Lula Fora!", 
      conteudo: "O governo Lula é uma farsa, tudo o que eles estão fazendo é roubar o povo! Lembre da vez que ele disse 'Eu não vou enganar o povo mais uma vez.' Atente-se como ele diz MAIS UMA VEZ! ABRAM OS OLHOS!!!", 
      publicado: false, 
      autor_id: 1, 
      categoria_id: 4
    },
    {
      id: 2, 
      titulo: "Caneta azul", 
      conteudo: "Olha aqui galerinhaaa, essa é a minha nova canetazuull, eu vou dar uma igual para todos os que votarem em mimmm", 
      publicado: true, 
      autor_id: 3, 
      categoria_id: 1
    },
    {
      id: 3, 
      titulo: "+1 Banido hoje", 
      conteudo: "Venho anunciar que tenho banido diversas pessoas mas uma em especifico me deu gosto, so nao vou dizer porque e segredinho", 
      publicado: true, 
      autor_id: 2, 
      categoria_id: 1
    }
  ])

  //Preenchimento da tabela Comentários
  await knex("comentarios").insert([
    { 
      id: 1, 
      texto: "Parabéns Mr. Blue pen, estou esperando a minha também meu voto ja ta na urna pae",  
      post_id: 2, 
      usuario_id: 3
    },
    { 
      id: 2, 
      texto: "Sinto orgulho de falar que meu parceiro Manuel Games não está banido, força Canetinha!",  
      post_id: 2, 
      usuario_id: 2
    }
  ])

  console.log("Seeds executadas")
}