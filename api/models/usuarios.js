const mongoose = require('mongoose')
const crypto = require('crypto');

const usuarios = mongoose.Schema({
    _id:{
        type: mongoose.Types.UUID,
        default: () => crypto.randomUUID,
        required: true
    },
    nome: String,
    email: String,
    senha: {
        type: String,
        select: false
    } 
});

const Usuario = mongoose.model("Usuario", usuarios)

module.exports = Usuario