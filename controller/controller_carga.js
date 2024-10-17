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
module.exports = {
    getListarCargas
}