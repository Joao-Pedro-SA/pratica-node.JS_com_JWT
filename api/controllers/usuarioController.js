const UsuarioService = require('../services/usuarioService')

const usuarioService = new UsuarioService()

class UsuarioController {

   static async cadastrar(req, res) {
        const {nome, email, senha } = req.body

        try{
            const usuario = await usuarioService.cadastrar({nome,email,senha})

            res.status(201).send(usuario);
        }catch (error){
            console.error();
            
            res.status(400).send({message: error.message})
        }

        
    }

    static async buscarUsuarios(req, res){

        try {
            const usuarios = await usuarioService.listaUsuarios()

            res.status(200).send(usuarios);
        } catch (error) {
            res.status(400).send({message: error.message});
        }
    }

    static async buscarUsuarioPorId(req, res){
        
        const { id } = req.params
       
        try{ 
        const usuario = await usuarioService.buscarUsuarioPorId(id)

        res.status(200).send(usuario);
       } catch(error){
        res.status(404).send({message: error.message})
       }
    }

    static async editarusuarioPorId(req, res){
        const { id } = req.params
        const dto = req.body
        try{
          const usuario = await usuarioService.editarusuario(id, dto)

          res.status(200).send(usuario)
        } catch (error){
            res.status(400).send({message: error.message})
        }
    }

    static async deletarUsuario(req,res){
        const { id } = req.params
        try {
            const usuario = await usuarioService.deletarUsuario(id)
            res.status(200).send({
                message: "O usuario foi deletado com sucesso",
                usuario: usuario 
            })
        } catch (error) {
            res.status(404).send({
            message: error.message
        });
        }
    }
}

module.exports = UsuarioController