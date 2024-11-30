// Importa o módulo "express", um framework para Node.js que facilita a criação de servidores web.
import express from "express";
import routes from "./src/routes/postsRouts.js";



// Cria uma instância da aplicação Express.
// Essa instância será usada para configurar rotas, middlewares e gerenciar requisições.
const app = express();

// Configura o Express para servir arquivos estáticos da pasta "uploads/"
// Isso permite que arquivos armazenados nesta pasta sejam acessados diretamente pela URL.
app.use(express.static("uploads"));

// Conecta as rotas do arquivo postsRouts.js ao servidor
//"Ei, função routes, aqui está meu servidor (app), use-o para configurar as rotas!"
routes(app);



// Define que o servidor vai escutar na porta 3000. É comumente usada para servidores locais
// O método "listen" inicia o servidor HTTP.
// O segundo argumento é uma função callback que será executada assim que o servidor começar a rodar.
app.listen(3000, () => {
    // Essa mensagem será exibida no terminal assim que o servidor for iniciado com sucesso.
    console.log("servidor escutando...");
});

//function buscarPostPorID(id) {
    // O método findIndex percorre o array "posts" e retorna o índice do primeiro item que atenda a condição.
    //return posts.findIndex((post) => {
        // A função de callback compara o "id" de cada "post" com o "id" fornecido como argumento da função.
        //return post.id === Number(id); // Converte o "id" para número e compara com o "id" do post
   // });
//}

// Aqui estamos configurando uma rota GET para o caminho '/posts/:id'.
// O `:id` é um parâmetro de URL. Ou seja, o valor depois de '/posts/' será usado como o ID que queremos procurar.
// `req.params.id` pega o valor do parâmetro `id` que foi passado na URL da requisição.
// Exemplo: se a URL for '/posts/2', então `req.params.id` será '2'. 
// A função `buscarPostPorID(req.params.id)` vai procurar o índice do post com esse ID dentro do array 'posts'.
// O resultado da função será o índice onde o post com esse ID está localizado no array.
// `res.status(200)` define que a resposta terá o código de status HTTP 200, que significa "OK" ou "sucesso".
// `res.json(posts[index])` envia a resposta em formato JSON contendo o post que foi encontrado no índice 'index'.
// Ou seja, o post correspondente ao ID fornecido na URL será enviado na resposta.
//app.get("/posts/:id", (req, res) => {
//    const index = buscarPostPorID(req.params.id);
//    res.status(200).json(posts[index]);
//});