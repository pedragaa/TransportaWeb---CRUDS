
/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const destinoDAO = require('../model/DAO/destino.js');




const getListarDestinos = async function(){
    
    let listarDestino;
    // Cria uma variavel do tipo json
    let destinoJson = {};

    if ((listarDestino)){
        return listarDestino;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosCarga = await destinoDAO.selectDestinos();

    // Verifica se existem dados retornados do DAO
    if(dadosCarga){
        if(dadosCarga.length > 0){
            if(dadosCarga.length > 0){
            
        // Montando a estrutura do JSOn
        destinoJson.empresas = dadosCarga;
        destinoJson.quantidade = dadosCarga.length;
        destinoJson.status_code = 200;
        // Retorna o JSON montado
        return destinoJson; // 200
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
    getListarDestinos
}
