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

const setInserirPartida = async (dadosPartida, contentType) => {

    

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){
    
    // Cria a variável json
    let resultdadosPartida = {}

    // Validação de campos obrigatórios e consistência de dados
    if(              
        dadosPartida.cep == ''                       || dadosPartida.cep == undefined           ||dadosPartida.cep.length > 10
        
    ){
        
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
        
        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novaPartida = await partidaDAO.insertPartida(dadosPartida);
        
            
        // Validação de inserção de dados no banco de dados 
        if(novaPartida){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultdadosPartida.status = message.SUCESS_CREATED_ITEM.status;
            resultdadosPartida.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultdadosPartida.message = message.SUCESS_CREATED_ITEM.message;
            resultdadosPartida.partida = dadosPartida;

            return resultdadosPartida;
     // 201
        } else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500 Erro na camada do DAO (Banco)
            
    
         }
       }
    }else{
        return message.ERROR_CONTENT_TYPE // 415 Erro no content type
    }
}catch(error){
    console.log(error)
    return message.ERROR_INTERNAL_SERVER // 500 Erro na camada de aplicação
}
}  
module.exports = {
    getListarPartidas,getListarPartidasByID, setInserirPartida
}