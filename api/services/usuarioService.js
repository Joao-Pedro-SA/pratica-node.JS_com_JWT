const Usuario = require('../models/usuarios')
const { hash } = require('bcryptjs')
const { ReturnDocument } = require('mongodb')
const uuid = require('uuid')

class UsuarioService {

    async cadastrar(dto) {
        const usuario = await Usuario.findOne({
            email: dto.email
        })

        if(usuario){
            throw new Error('Usuario já esta cadastrado')
        }

        try{
            const senhaHash = await hash(dto.senha, 8)

            const novoUsuario = await Usuario.insertOne({
                _id: uuid.v4(),
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })

        return novoUsuario
      }catch(error){
            console.log(error)
            throw new Error('Erro ao cadastrar usuario')
            
        }

    
    }

    async listaUsuarios(){
        try{
           return await Usuario.find() 
        } catch(error){
            throw new Error("Falha ao listar usuarios");        
        }
        
    }
    
    async buscarUsuarioPorId(id){
        try{
            const usuario = await Usuario.findById(id)

            if (!usuario) {
                throw new Error("Usuario não encontrado")
            }

            return usuario

        } catch(error){
            throw new Error("Usuario não encontrado");
            
        }
    }

    async editarusuario(id, dto){
        const senhaHash = await hash(dto.senha, 8)

        try {
            const usuario = await Usuario.findByIdAndUpdate(
                 id, 
                {
                    nome: dto.nome,
                    email: dto.email,
                    senha: senhaHash
                },
                { returnDocument: "after", runValidators: true }
            )

            if (!usuario) {
                throw new Error("Usuario não encontrado");    
            }
            
            return usuario

        } catch (error) {
            throw error;
            
        }
    }

    async deletarUsuario(id){
        try {
          const usuario = await Usuario.findOneAndDelete(
                {"_id": id}
            )

        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }

        return usuario
        } catch (error) {
            
        }
    }
}

module.exports = UsuarioService