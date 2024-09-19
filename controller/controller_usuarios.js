
const message = require('../modulo/config.js')
const usuariosDAO = require('../model/DAO/usuarios.js')

const getListarUsuarios = async function(){
    
    let listaUsusarios;
    // Cria uma variavel do tipo json
    let usuariosJSON = {};

    if ((listaUsusarios)){
        return listaUsusarios;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosUsuarios = await usuariosDAO.selectAllUsers();

    // Verifica se existem dados retornados do DAO
    if(dadosUsuarios){
        if(dadosUsuarios.length > 0){
            if(dadosUsuarios.length > 0){
            
        // Montando a estrutura do JSOn
        usuariosJSON.usuarios = dadosUsuarios;
        usuariosJSON.quantidade = dadosUsuarios.length;
        usuariosJSON.status_code = 200;
        // Retorna o JSON montado
        return usuariosJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}
module.exports = {
    getListarUsuarios
}