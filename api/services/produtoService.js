
const Produto = require('../models/produtos');

class ProdutoService {
    async cadastrarProduto(dto) {
        const produtoExistente = await Produto.findOne({
            nome: dto.nome
        });

        if (produtoExistente) {
            throw new Error('Produto já cadastrado');
        }

        try {
            const newProduto = await Produto.create({
                nome: dto.nome,
                descricao: dto.descricao,
                preco: dto.preco
            });

            return newProduto;

        } catch (error) {
            console.error('Message error: ', error.message);
            throw error;
        }
    }

    async buscarTodosProdutos() {
        const produtos = await Produto.find();

        return produtos;
    }

    async buscarProdutoPorId(id) {
        const produto = await Produto.findById(id);

        if (!produto) {
            throw new Error('Produto informado não cadastrado!');
        }

        return produto;
    }

    async deletarProdutoPorId(id) {
        const produto = await Produto.findById(id);

        if (!produto) {
            throw new Error('Produto informado não cadastrado!');
        }

        try {
            await produto.deleteOne();

        } catch (error) {
            console.error('Message error: ', error.message);
            throw error;
        }
    }

    async editarProduto(dto) {
        const produto = await Produto.findById(dto.id);

        if (!produto) {
            throw new Error('Produto informado não cadastrado!');
        }

        try {
            produto.nome = dto.nome;
            produto.descricao = dto.descricao;
            produto.preco = dto.preco;

            await produto.save();

            return produto;

        } catch (error) {
            console.error('Message error: ', error.message);
            throw error;
        }
    }
}

module.exports = ProdutoService;
