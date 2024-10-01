/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const viagemDAO = require('../model/DAO/viagens.js');



const getListarViagens = async function(){
    
    let listaViagens;
    // Cria uma variavel do tipo json
    let viagensJSon = {};

    if ((listaViagens)){
        return listaViagens;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosViagem = await viagemDAO.selectAllViagens();

    // Verifica se existem dados retornados do DAO
    if(dadosViagem){
        if(dadosViagem.length > 0){
            if(dadosViagem.length > 0){
            
        // Montando a estrutura do JSOn
        viagensJSon.viagens = dadosViagem;
        viagensJSon.quantidade = dadosViagem.length;
        viagensJSon.status_code = 200;
        // Retorna o JSON montado
        return viagensJSon; // 200
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
    selectAllViagens
}