/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const notificacaoDAO = require('../model/DAO/notificacao.js');

const getListsarNotificacaoEmpresa = async function(id){
    
    let idNotificacao = id;
    // Cria uma variavel do tipo json
    let notificacaoJSON = {};

    if (idNotificacao == '' || idNotificacao == undefined || isNaN(idNotificacao)){
        return message.ERROR_INVALID_ID;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosNotificacao = await notificacaoDAO.selectAllNotificacoesEmpresa(id);

    // Verifica se existem dados retornados do DAO
    if(dadosNotificacao){
        if(dadosNotificacao.length > 0){
            if(dadosNotificacao.length > 0){
            
        // Montando a estrutura do JSOn
        notificacaoJSON.notificacoes = dadosNotificacao;
        notificacaoJSON.quantidade = dadosNotificacao.length;
        notificacaoJSON.status_code = 200;
        // Retorna o JSON montado
        return notificacaoJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}
const getListsarNotificacaoMotorista = async function(id){
    
    let idNotificacao = id;
    // Cria uma variavel do tipo json
    let notificacaoJSON = {};

    if (idNotificacao == '' || idNotificacao == undefined || isNaN(idNotificacao)){
        return message.ERROR_INVALID_ID;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosNotificacao = await notificacaoDAO.selectAllNotificacoesMotorista(id);

    // Verifica se existem dados retornados do DAO
    if(dadosNotificacao){
        if(dadosNotificacao.length > 0){
            if(dadosNotificacao.length > 0){
            
        // Montando a estrutura do JSOn
        notificacaoJSON.notificacoes = dadosNotificacao;
        notificacaoJSON.quantidade = dadosNotificacao.length;
        notificacaoJSON.status_code = 200;
        // Retorna o JSON montado
        return notificacaoJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}


const setInserirNotificacao = async (dadosNotificacao, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
        
            let resultdadosNotificacao = {};

            // Validação de campos obrigatórios e consistência de dados
            if (
                dadosNotificacao.id_empresa == '' || dadosNotificacao.id_empresa == undefined || dadosNotificacao.id_empresa.length > 1 ||
                dadosNotificacao.id_motorista == '' || dadosNotificacao.id_motorista == undefined || dadosNotificacao.id_motorista.length > 1 ||
                dadosNotificacao.mensagem_id == '' || dadosNotificacao.mensagem_id == undefined || dadosNotificacao.mensagem_id.length > 1
                
            ) {
                console.log(dadosVeiculo);
                return message.ERROR_REQUIRED_FIELDS;
            } else {
    
                    let novoVeiculo = await notificacaoDAO.insertNotificacao(dadosNotificacao);
                    // let idSelect = await viagemDAO.selectIDViagem();

                    // dadosVeiculo.id = Number(idSelect[0].id);

                    if (novoVeiculo) {
                        resultdadosNotificacao.status = message.SUCESS_CREATED_ITEM.status;
                        resultdadosNotificacao.status_code = message.SUCESS_CREATED_ITEM.status_code;
                        resultdadosNotificacao.message = message.SUCESS_CREATED_ITEM.message;
                        resultdadosNotificacao.notificacao = dadosVeiculo;

                        return resultdadosNotificacao;
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB;
                    }
                }
            }
     
        
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};
module.exports = {
    getListsarNotificacaoEmpresa,
    getListsarNotificacaoMotorista,
    setInserirNotificacao
}