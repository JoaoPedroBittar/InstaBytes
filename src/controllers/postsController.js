import fs from "fs"; // Importa o módulo fs (File System) para manipulação de arquivos no sistema de arquivos.
import { atualizarPost, criarPost, getTodosPosts } from "../models/postsModel.js"; // Importa as funções `criarPost` e `getTodosPosts` do arquivo `postsModel.js`, que interagem com o banco de dados.
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Chama a função para buscar os posts
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) { // Define a função assíncrona para criar um novo post
    const novoPost = req.body;  // Extrai os dados do corpo da requisição (dados do post)
    
    try {
        const postCriado = await criarPost(novoPost); // Chama a função `criarPost` para salvar o novo post no banco de dados, aguardando a resposta
        res.status(200).json(postCriado);  // Retorna a resposta HTTP com status 200 (OK) e os dados do post criado
    } catch(erro) {  // Se ocorrer um erro durante o processo
        console.error(erro.message);  // Exibe a mensagem de erro no console para facilitar a depuração
        res.status(500).json({"Erro":"Falha na requisição"});  // Retorna uma resposta HTTP com status 500 (Erro interno) e a mensagem de erro
    }
}

export async function uploadImagem(req, res) {  // Define a função assíncrona que será responsável por fazer o upload de uma imagem
    const novoPost = {  // Cria um objeto novoPost com os dados necessários para salvar no banco de dados
        descricao: "",  // Define um valor vazio para a descrição, pois não foi fornecido no código.
        imgUrl: req.file.originalname,  // Define o nome do arquivo da imagem, utilizando o nome original enviado pelo cliente.
        alt: ""  // Define um valor vazio para o texto alternativo (alt), que poderia ser preenchido com algum valor de descrição da imagem.
    };


    try {  // Inicia um bloco try para capturar possíveis erros durante o processo de upload da imagem e criação do post

        const postCriado = await criarPost(novoPost);  // Chama a função `criarPost` para salvar o novo post no banco de dados, aguardando o resultado com `await`    
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;  // Cria o caminho do novo arquivo de imagem, utilizando o ID do post inserido no banco para garantir que o nome seja único
        fs.renameSync(req.file.path, imagemAtualizada);  // Renomeia (ou move) o arquivo da imagem do diretório temporário para o diretório definitivo (com o novo nome baseado no ID do post)
        res.status(200).json(postCriado);  // Retorna uma resposta HTTP com status 200 (OK) e os dados do post recém-criado em formato JSON

    } catch(erro) {  // Captura qualquer erro que ocorra no processo de criação do post ou manipulação da imagem
        console.error(erro.message);  // Exibe a mensagem do erro no console para facilitar a depuração
        res.status(500).json({"Erro":"Falha na requisição"});  // Retorna uma resposta HTTP com status 500 (Erro interno do servidor) e uma mensagem de erro
    }
    
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imgBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);  
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}