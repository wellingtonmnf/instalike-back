import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configura o armazenamento das imagens em disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para as imagens (substitua 'uploads/' pelo caminho desejado)
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Define o nome do arquivo, mantendo o nome original
    cb(null, file.originalname);
  }
});

// Cria um objeto de upload utilizando o armazenamento configurado
const upload = multer({ dest: "./uploads" , storage });
// Sistemas Linux ou macOS podem usar uma configuração mais simples
// const upload = multer({ dest: "./uploads"});

const routes = (app) => {
  // Habilita o parsing de dados JSON nas requisições
  app.use(express.json());

  // Rota GET para listar todos os posts (implementada em postsController.js)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (implementada em postsController.js)
  app.post("/posts", postarNovoPost);

  // Rota POST para fazer upload de uma imagem (implementada em postsController.js)
  // O parâmetro 'upload.single("imagem")' indica que estamos esperando um único arquivo com o nome 'imagem'
  app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes;