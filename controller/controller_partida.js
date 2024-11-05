/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const partidaDAO = require('../model/DAO/partida.js');


const getListarPartidas = async function(){
    
    let listaPartida;
    // Cria uma variavel do tipo json
    let partidaJson = {};

    if ((listaPartida)){
        return listaPartida;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosPartida = await partidaDAO.selectPartida();

    // Verifica se existem dados retornados do DAO
    if(dadosPartida){
        if(dadosPartida.length > 0){
            if(dadosPartida.length > 0){
            
        // Montando a estrutura do JSOn
        partidaJson.empresas = dadosPartida;
        partidaJson.quantidade = dadosPartida.length;
        partidaJson.status_code = 200;
        // Retorna o JSON montado
        return partidaJson; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}
const getListarPartidasByID = async function (id){
   
    // Recebe o id do ator
    let idPartida = id;

    // Variável para criar o json do atores
    let partidaJson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idPartida == '' || idPartida == undefined || isNaN(idPartida)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosPartida = await partidaDAO.selectPartidaById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosPartida){
            // Validação para verificar se existem dados de retorno
            if(dadosPartida.length > 0){
            partidaJson.partida = dadosPartida;
            partidaJson.status_code = 200

            return partidaJson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}
module.exports = {
    getListarPartidas,getListarPartidasByID
}