/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const cargaDAO = require('../model/DAO/carga.js');




const getListarCargas = async function(){
    
    let listaCarga;
    // Cria uma variavel do tipo json
    let cargaJson = {};

    if ((listaCarga)){
        return listaCarga;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosCarga = await cargaDAO.selectCargas();

    // Verifica se existem dados retornados do DAO
    if(dadosCarga){
        if(dadosCarga.length > 0){
            if(dadosCarga.length > 0){
            
        // Montando a estrutura do JSOn
        cargaJson.empresas = dadosCarga;
        cargaJson.quantidade = dadosCarga.length;
        cargaJson.status_code = 200;
        // Retorna o JSON montado
        return cargaJson; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}
const getListarCargaById = async function (id){
   
    // Recebe o id do ator
    let idCarga = id;

    // Variável para criar o json do atores
    let cargaJson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idCarga == '' || idCarga == undefined || isNaN(idCarga)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosCarga = await cargaDAO.selectCargaByID(id)


        // Validação para verificar se existem dados encontrados
        if(dadosCarga){
            // Validação para verificar se existem dados de retorno
            if(dadosCarga.length > 0){
            cargaJson.partida = dadosCarga;
            cargaJson.status_code = 200

            return cargaJson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}
module.exports = {
    getListarCargas,
    getListarCargaById
}