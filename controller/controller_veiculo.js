/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const veiculoDAO = require('../model/DAO/veiculo.js');

const getListarVeiculos = async function(){
    
    let listaveiculo;
    // Cria uma variavel do tipo json
    let veiculoJson = {};

    if ((listaveiculo)){
        return listaveiculo;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosVeiculo = await veiculoDAO.selectAllVeiculo();

    // Verifica se existem dados retornados do DAO
    if(dadosVeiculo){
        if(dadosVeiculo.length > 0){
            if(dadosVeiculo.length > 0){
            
        // Montando a estrutura do JSOn
        veiculoJson.veiculos = dadosVeiculo;
        veiculoJson.quantidade = dadosVeiculo.length;
        veiculoJson.status_code = 200;
        // Retorna o JSON montado
        return veiculoJson; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}
const getBuscarVeiculoModelo = async function (modelo){
    try {
        
        let modeloVeiculo = modelo;
        let modeloJson = {}
        if (modeloVeiculo == '' ||modeloVeiculo==undefined||!isNaN(modeloVeiculo))
        return message.ERROR_INVALID_ID
        else {
            let dadosVeiculo = await veiculoDAO.selectVeiculoByModelo (modeloVeiculo)
            if (dadosVeiculo){
                if (dadosVeiculo.length>0){
                    modeloJson.empresa = dadosVeiculo
                    modeloJson.status_code = 200 
                    return modeloJson
                } else 
                return message.ERROR_NOT_FOUND
            }
            else 
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarveiculoBYID = async function (id){
   
    // Recebe o id do ator
    let idveiculo = id;

    // Variável para criar o json do atores
    let veiculoJson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idveiculo == '' || idveiculo == undefined || isNaN(idveiculo)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosVeiculo = await veiculoDAO.selectVeiculosByID(id)


        // Validação para verificar se existem dados encontrados
        if(dadosVeiculo){
            // Validação para verificar se existem dados de retorno
            if(dadosVeiculo.length > 0){
            veiculoJson.motorista = dadosVeiculo;
            veiculoJson.status_code = 200

            return veiculoJson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}
const setInserirVeiculo = async (dadosVeiculo, contentType) => {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
        
            let resultdadosVeiculo = {};

            // Validação de campos obrigatórios e consistência de dados
            if (
                dadosVeiculo.placa == '' || dadosVeiculo.placa == undefined || dadosVeiculo.placa.length > 9 ||
                dadosVeiculo.modelo == '' || dadosVeiculo.modelo == undefined || dadosVeiculo.modelo.length > 50 ||
                dadosVeiculo.ano == '' || dadosVeiculo.ano == undefined || dadosVeiculo.ano.length > 4 ||
                dadosVeiculo.tipo == '' || dadosVeiculo.tipo == undefined || dadosVeiculo.tipo.length > 30 ||
                dadosVeiculo.capacidade_carga == '' || dadosVeiculo.capacidade_carga == undefined || dadosVeiculo.capacidade_carga.length > 12 

            ) {
                console.log(dadosVeiculo);
                return message.ERROR_REQUIRED_FIELDS;
            } else {
    
                    let novoVeiculo = await veiculoDAO.insertVeiculo(dadosVeiculo);
                    // let idSelect = await viagemDAO.selectIDViagem();

                    // dadosVeiculo.id = Number(idSelect[0].id);

                    if (novoVeiculo) {
                        resultdadosVeiculo.status = message.SUCESS_CREATED_ITEM.status;
                        resultdadosVeiculo.status_code = message.SUCESS_CREATED_ITEM.status_code;
                        resultdadosVeiculo.message = message.SUCESS_CREATED_ITEM.message;
                        resultdadosVeiculo.veiculo = dadosVeiculo;

                        return resultdadosVeiculo;
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
    getBuscarVeiculoModelo,
    getListarVeiculos,
    getListarveiculoBYID,
    setInserirVeiculo
}