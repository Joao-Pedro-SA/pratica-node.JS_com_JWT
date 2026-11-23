const Usuario = require('../models/usuarios')

class AuthService {

    async login(dto){
       const usuario = await Usuario.findOne({
            email: dto.email
       }).select('_id email +senha')

       if(!usuario){
        throw new Error("Usuario não cadastrado");
        
       }
    }
}

module.exports = AuthService