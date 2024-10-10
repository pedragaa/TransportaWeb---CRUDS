/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const motoristaveiculoDAO = require('../model/DAO/motoristaveiculo.js');



const getListarMotoristaVeiculo = async function(){
    
    let listaMotoristasVeiculos;
    // Cria uma variavel do tipo json
    let motoristaVeiculoJson = {};

    if ((listaMotoristasVeiculos)){
        return listaMotoristasVeiculos;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosMotoristaVeiculo = await motoristaveiculoDAO.selectAllMotoristasVeiculos();

    // Verifica se existem dados retornados do DAO
    if(dadosMotoristaVeiculo){
        if(dadosMotoristaVeiculo.length > 0){
            if(dadosMotoristaVeiculo.length > 0){
            
        // Montando a estrutura do JSOn
        motoristaVeiculoJson.motoristas = dadosMotoristaVeiculo;
        motoristaVeiculoJson.quantidade = dadosMotoristaVeiculo.length;
        motoristaVeiculoJson.status_code = 200;
        // Retorna o JSON montado
        return motoristaVeiculoJson; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}
const getListarMotoristaVeiculoByID = async function (id){
   
    // Recebe o id do ator
    let idMotoristaVeiculo = id;

    // Variável para criar o json do atores
    let motoristaVeiculoJSON = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idMotoristaVeiculo == '' || idMotoristaVeiculo == undefined || isNaN(idMotoristaVeiculo)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosMotoristaVeiculo = await motoristaveiculoDAO.selectMotoristaVeiculoById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosMotoristaVeiculo){
            // Validação para verificar se existem dados de retorno
            if(dadosMotoristaVeiculo.length > 0){
            motoristaVeiculoJSON.motoristaVeiculo = dadosMotoristaVeiculo;
            motoristaVeiculoJSON.status_code = 200

            return motoristaVeiculoJSON; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

const setInserirNovoMotoristaVeiculo = async (dadosMotoristaVeiculo, contentType) => {

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){

    

    // Cria a variável json
    let resultdadosMotoristaVeiculo = {}

    // Validação de campos obrigatórios e consistência de dados
    if( dadosMotoristaVeiculo.id_motorista == ''                       || dadosMotoristaVeiculo.id_motorista == undefined             || dadosMotoristaVeiculo.id_motorista.length > 1       ||
        dadosMotoristaVeiculo.id_veiculo == ''                        || dadosMotoristaVeiculo.id_veiculo == undefined              || dadosMotoristaVeiculo.id_veiculo.length > 1
         
        
    ){
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
   
        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novoMotorista = await motoristaveiculoDAO.insertMotoristaVeiculo(dadosMotoristaVeiculo);

        let idSelect = await motoristaveiculoDAO.selectIdMotoristaVeiculo();

        dadosMotoristaVeiculo.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novoMotorista){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultdadosMotoristaVeiculo.status = message.SUCESS_CREATED_ITEM.status;
            resultdadosMotoristaVeiculo.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultdadosMotoristaVeiculo.message = message.SUCESS_CREATED_ITEM.message;
            resultdadosMotoristaVeiculo.motorista = dadosMotoristaVeiculo;

            return resultdadosMotoristaVeiculo; // 201
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
    getListarMotoristaVeiculo,
    getListarMotoristaVeiculoByID,
    setInserirNovoMotoristaVeiculo
}