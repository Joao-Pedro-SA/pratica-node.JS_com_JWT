const mongoose = require('mongoose')

const produtos = mongoose.Schema({
    nome: String,
    descricao: String,
    preco: Number
});

const Produto = mongoose.model("Produto", produtos)

module.exports = Produto