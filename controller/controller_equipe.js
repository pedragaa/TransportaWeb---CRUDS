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



const setInserirNovaEquipe = async (dadosEquipe, contentType) => {

    

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){
    
    // Cria a variável json
    let resultdadosEquipe = {}

    // Validação de campos obrigatórios e consistência de dados
    if(              
        dadosEquipe.id_motorista == ''                       || dadosEquipe.id_motorista == undefined           || !dadosEquipe.id_motorista         || 
        dadosEquipe.id_empresa == ''                  || dadosEquipe.id_empresa == undefined   || !dadosEquipe.id_empresa
        
    ){
        
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
        
        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novaEquipe = await equipeDAO.insertMotoristaEquipe(dadosEquipe);
        
        let idSelect = await equipeDAO.selectIdEquipe();
        
        dadosEquipe.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novaEquipe){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultdadosEquipe.status = message.SUCESS_CREATED_ITEM.status;
            resultdadosEquipe.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultdadosEquipe.message = message.SUCESS_CREATED_ITEM.message;
            resultdadosEquipe.equipe = dadosEquipe;
            console.log(dadosEquipe)

            return resultdadosEquipe;
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

const setExcluirMotoristaEquipe = async (dadosEquipe, contentType) => {
    try {
        // Verificar se o content-type da requisição é JSON
        if (String(contentType).toLowerCase() !== 'application/json') {
            return {
                status: false,
                status_code: 415,
                message: 'Tipo de conteúdo não suportado. Use application/json.'
            };
        }

        // Validar campos obrigatórios
        if (  dadosEquipe.id_motorista == ''                       || dadosEquipe.id_motorista == undefined           || !dadosEquipe.id_motorista         || 
            dadosEquipe.id_empresa == ''                  || dadosEquipe.id_empresa == undefined   || !dadosEquipe.id_empresa ) {
            return {
                status: false,
                status_code: 400,
                message: 'Campos obrigatórios ausentes: id_motorista e id_empresa.'
            };
        }

        // Tentar excluir os dados no banco
        let motoristaExcluido = await deleteMotoristaEquipe(dadosEquipe.id_motorista, dadosEquipe.id_empresa);

        if (!motoristaExcluido) {
            return {
                status: false,
                status_code: 500,
                message: 'Erro ao excluir motorista da equipe.'
            };
        }

        // Retornar sucesso se a exclusão for bem-sucedida
        return {
            status: true,
            status_code: 200,
            message: 'Motorista excluído da equipe com sucesso.'
        };

    } catch (error) {
        console.error('Erro ao excluir motorista da equipe:', error);
        return {
            status: false,
            status_code: 500,
            message: 'Erro interno ao processar a requisição.'
        };
    }
};






module.exports = {
    getListarEquipe,
    getListarEquipeById,
    getListarMotoristaEquipeById,
    setInserirNovaEquipe,
    setExcluirMotoristaEquipe
}
