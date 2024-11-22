import conectarAoBanco from "../config/dbConfig.js";
// Conecta ao banco de dados usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Obtém o banco de dados 'imersao-instabytes' da conexão
    const db = conexao.db("imersao-instabytes");
    // Obtém a coleção 'posts' do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
};

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}