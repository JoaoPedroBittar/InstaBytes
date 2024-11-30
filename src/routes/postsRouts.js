import cors from "cors";
import express from "express"; // Importa o módulo Express para criação do servidor e manipulação de rotas.
import multer from "multer"; // Importa o módulo multer para lidar com uploads de arquivos.
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js"; // Importa funções do controlador de posts.

const corsOptions = {
    origin:"http://localhost:8000",
    optionsSuccessStatus: 200
}

// Os 4 principais verbos HTTP são:
// - POST: para criar recursos.
// - GET: para ler recursos.
// - DELETE: para deletar recursos.
// - PUT: para atualizar recursos.

// Configuração do armazenamento de arquivos usando o multer.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Define o diretório onde os arquivos serão salvos, neste caso, a pasta 'uploads/'.
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);  // O nome do arquivo será mantido como o nome original enviado pelo cliente.
    }
});

// Configura o multer para usar o armazenamento definido em `storage`.
// Define o destino e o nome do arquivo para os uploads.
const upload = multer({dest: "./uploads", storage});  // Caminho de armazenamento padrão para arquivos (opcional, pois `storage` já foi configurado).

// Definindo as rotas do aplicativo Express.
const routes = (app) => {

    // Middleware "express.json()" configura o Express para processar requisições com corpo em formato JSON.
    // Isso é útil para receber dados em endpoints que utilizam POST, PUT, etc.
    app.use(express.json());
    app.use(cors(corsOptions))
    // Rota HTTP GET para a URL "/posts".
    // Quando uma requisição GET é feita para "http://localhost:3000/posts", a função "listarPosts" é chamada.
    // "listarPosts" busca todos os posts no banco de dados e os retorna em formato JSON como resposta.
    app.get("/posts", listarPosts);
    
    // Rota HTTP POST para a URL "/posts".
    // Quando uma requisição POST é feita para "http://localhost:3000/posts", a função "postarNovoPost" é chamada.
    // "postarNovoPost" recebe os dados enviados no corpo da requisição, processa-os e cria um novo post no banco de dados.
    app.post("/posts", postarNovoPost);
    
    // Rota para upload de imagem.
    // Utiliza `upload.single("imagem")` para processar um único arquivo enviado pelo cliente com o campo "imagem" no formulário.
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost)
}

export default routes;  // Exporta o módulo de rotas para ser utilizado no servidor principal.
