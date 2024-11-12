/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const equipeDAO = require('../model/DAO/equipe.js');



const getListarEquipe = async function(){
    
    let listaEquipe;
    // Cria uma variavel do tipo json
    let equipejson = {};

    if ((listaEquipe)){
        return listaEquipe;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosEquipe = await equipeDAO.selectEquipes();

    // Verifica se existem dados retornados do DAO
    if(dadosEquipe){
        if(dadosEquipe.length > 0){
            if(dadosEquipe.length > 0){
            
        // Montando a estrutura do JSOn
        equipejson.equipes = dadosEquipe;
        equipejson.quantidade = dadosEquipe.length;
        equipejson.status_code = 200;
        // Retorna o JSON montado
        return equipejson; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}
const getListarEquipeById = async function (id){
   
    // Recebe o id do ator
    let idEquipe = id;

    // Variável para criar o json do atores
    let equipejson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idEquipe == '' || idEquipe == undefined || isNaN(idEquipe)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosEquipe = await equipeDAO.selectEquipeById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosEquipe){
            // Validação para verificar se existem dados de retorno
            if(dadosEquipe.length > 0){
            equipejson.equipe = dadosEquipe;
            equipejson.status_code = 200

            return equipejson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}
const getListarMotoristaEquipeById = async function (id){
   
    // Recebe o id do ator
    let idEquipe = id;

    // Variável para criar o json do atores
    let equipejson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idEquipe == '' || idEquipe == undefined || isNaN(idEquipe)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosEquipe = await equipeDAO.selectMotoristaEquipeById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosEquipe){
            // Validação para verificar se existem dados de retorno
            if(dadosEquipe.length > 0){
            equipejson.equipe = dadosEquipe;
            equipejson.status_code = 200

            return equipejson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

module.exports = {
    getListarEquipe,
    getListarEquipeById,
    getListarMotoristaEquipeById
}
