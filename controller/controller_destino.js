
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
const getListarDestinosById = async function (id){
   
    // Recebe o id do ator
    let idDestino = id;

    // Variável para criar o json do atores
    let destinoJson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idDestino == '' || idDestino == undefined || isNaN(idDestino)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosDestino = await destinoDAO.selectDestinoById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosDestino){
            // Validação para verificar se existem dados de retorno
            if(dadosDestino.length > 0){
            destinoJson.partida = dadosDestino;
            destinoJson.status_code = 200

            return destinoJson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}
module.exports = {
    getListarDestinos,
    getListarDestinosById
}
