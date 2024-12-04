/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const viagemDAO = require('../model/DAO/viagens.js');



const getListarViagens = async function(){
    
    let listaViagens;
    // Cria uma variavel do tipo json
    let viagensJSon = {};

    if ((listaViagens)){
        return listaViagens;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosViagem = await viagemDAO.selectAllViagens();

    // Verifica se existem dados retornados do DAO
    if(dadosViagem){
        if(dadosViagem.length > 0){
            if(dadosViagem.length > 0){
             
            
        // Montando a estrutura do JSOn
        viagensJSon.viagens = dadosViagem;
        viagensJSon.quantidade = dadosViagem.length;
        viagensJSon.status_code = 200;
        // Retorna o JSON montado
        return viagensJSon; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}

const getListarViagemById = async function (id){
   
    // Recebe o id do ator
    let idViagem = id;

    // Variável para criar o json do atores
    let viagemJson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idViagem == '' || idViagem == undefined){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosViagem = await viagemDAO.selectViagensByID(id)


        // Validação para verificar se existem dados encontrados
        if(dadosViagem){
            // Validação para verificar se existem dados de retorno
            if(dadosViagem.length > 0){
            viagemJson.motorista = dadosViagem;
            viagemJson.status_code = 200

            return viagemJson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}


const getListarViagemByIdEmpresa = async function (id){
   
    // Recebe o id do ator
    let idViagem = id;

    // Variável para criar o json do atores
    let viagemJson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idViagem == '' || idViagem == undefined || isNaN(idViagem)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosViagem = await viagemDAO.selectViagensByIdEmpresa(id)


        // Validação para verificar se existem dados encontrados
        if(dadosViagem){
            // Validação para verificar se existem dados de retorno
            if(dadosViagem.length > 0){
            viagemJson.empresa_viagem = dadosViagem;
            viagemJson.status_code = 200

            return viagemJson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}
const getBuscarViagemByNome = async function (id_viagem){
    try {
        
        let idviagem = id_viagem;
        let viagemJson = {}
        if (idviagem == '' ||idviagem==undefined || idviagem == isNaN)
        return message.ERROR_INVALID_ID
        else {
            let dadosViagem = await viagemDAO.selectViagemByNome(idviagem)
            if (dadosViagem){
                if (dadosViagem.length>0){
                    viagemJson.viagem = dadosViagem
                    viagemJson.status_code = 200 
                    return viagemJson
                } else 
                return message.ERROR_NOT_FOUND
            }
            else 
            return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}
const setInserirViagem = async (dadosViagem, contentType) => {
    try {
        // Verifica se o contentType é 'application/json'
        if (String(contentType).toLowerCase() == 'application/json') {
            
            // Converte strings vazias ou 'null' para null no campo id_motorista
            dadosViagem.id_motorista = (dadosViagem.id_motorista === '' || dadosViagem.id_motorista === 'null') ? null : dadosViagem.id_motorista;


            let resultdadosViagem = {};

            // Validação de campos obrigatórios e consistência de dados
            if (
                dadosViagem.id_viagem == '' || dadosViagem.id_viagem == undefined || dadosViagem.id_viagem.length > 11 ||
                dadosViagem.dia_partida == '' || dadosViagem.dia_partida == undefined || dadosViagem.dia_partida.length > 10 ||
                dadosViagem.horario_partida == '' || dadosViagem.horario_partida == undefined || dadosViagem.horario_partida.length > 8 ||
                dadosViagem.remetente == '' || dadosViagem.remetente == undefined || dadosViagem.remetente.length > 256 ||
                dadosViagem.destinatario == '' || dadosViagem.destinatario == undefined || dadosViagem.destinatario.length > 256 ||
                dadosViagem.status_entregue == '' || dadosViagem.status_entregue == undefined || dadosViagem.status_entregue.length > 1 ||
                dadosViagem.id_partida == '' || dadosViagem.id_partida == undefined || dadosViagem.id_partida.length > 1 ||
                dadosViagem.id_destino == '' || dadosViagem.id_destino == undefined || dadosViagem.id_destino.length > 1 ||
                dadosViagem.id_veiculo == '' || dadosViagem.id_veiculo == undefined || dadosViagem.id_veiculo.length > 1 ||
                dadosViagem.id_tipo_carga == '' || dadosViagem.id_tipo_carga == undefined || dadosViagem.id_tipo_carga.length > 1 ||
                dadosViagem.id_empresa == '' || dadosViagem.id_empresa == undefined || dadosViagem.id_empresa.length > 1
            ) {
                console.log(dadosViagem);
                return message.ERROR_REQUIRED_FIELDS;
            } else {
                let dadosValidated = false;

                // Validação de digitação para a data de chegada que não é campo obrigatório
                if (dadosViagem.dia_chegada != null && dadosViagem.dia_chegada != undefined && dadosViagem.dia_chegada != "") {
                    if (dadosViagem.dia_chegada.length != 10) return message.ERROR_REQUIRED_FIELDS;
                    else dadosValidated = true;
                } else {
                    dadosValidated = true;
                }
                

                if (dadosValidated) {
                    // Inserção de viagem no banco de dados
                    let novoMotorista = await viagemDAO.insertViagem(dadosViagem);
                    let idSelect = await viagemDAO.selectIDViagem();

                    dadosViagem.id = Number(idSelect[0].id);

                    // Verifica se a inserção foi bem-sucedida
                    if (novoMotorista) {
                        resultdadosViagem.status = message.SUCESS_CREATED_ITEM.status;
                        resultdadosViagem.status_code = message.SUCESS_CREATED_ITEM.status_code;
                        resultdadosViagem.message = message.SUCESS_CREATED_ITEM.message;
                        resultdadosViagem.viagem = dadosViagem;

                        return resultdadosViagem;
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB;
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE;
        }
    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER;
    }
};



const setDeleteViagem = async function(id){
    try {
        
        let idViagem = id;

        if(idViagem == '' || idViagem == undefined || isNaN(idViagem)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await viagemDAO.selectViagensByID(idViagem)

            if(chamarConst.length > 0){
                let dadosViagem = await viagemDAO.deleteViagemByID(id)

                if(dadosViagem){
                    return message.SUCESS_DELETED_ITEM
                }else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            
        }else {
            return message.ERROR_NOT_FOUND
        }
    }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}
const setUpdateviagem = async function(id, contentType, dadosViagem){
    try{
        let idMotorista = id;

        if(idMotorista == '' || idMotorista == undefined || isNaN (idMotorista)){
            return message.ERROR_INVALID_ID;

           
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateMotoristaJson = {};
           // Validação de campos obrigatórios e consistência de dados
           if(dadosViagem.id_viagem == '' || dadosViagem.id_viagem == undefined || dadosViagem.id_viagem.length > 11 ||
           dadosViagem.dia_partida == '' || dadosViagem.dia_partida == undefined || dadosViagem.dia_partida.length > 10 ||
           dadosViagem.horario_partida == '' || dadosViagem.horario_partida == undefined || dadosViagem.horario_partida.length > 8 ||
           dadosViagem.remetente == '' || dadosViagem.remetente == undefined || dadosViagem.remetente.length > 256 ||
           dadosViagem.destinatario == '' || dadosViagem.destinatario == undefined || dadosViagem.destinatario.length > 256 ||
           dadosViagem.status_entregue == '' || dadosViagem.status_entregue == undefined || dadosViagem.status_entregue.length > 1 ||
           dadosViagem.id_partida == '' || dadosViagem.id_partida == undefined || dadosViagem.id_partida.length > 1 ||
           dadosViagem.id_destino == '' || dadosViagem.id_destino == undefined || dadosViagem.id_destino.length > 1 ||
           dadosViagem.id_motorista == '' || dadosViagem.id_motorista == undefined || dadosViagem.id_motorista.length > 1 ||
           dadosViagem.id_veiculo == '' || dadosViagem.id_veiculo == undefined || dadosViagem.id_veiculo.length > 1 ||
           dadosViagem.id_tipo_carga == '' || dadosViagem.id_tipo_carga == undefined || dadosViagem.id_tipo_carga.length > 1 ||
           dadosViagem.id_empresa == '' || dadosViagem.id_empresa == undefined || dadosViagem.id_empresa.length > 1
            
    
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let dadosValidated = false;

            // Validação de digitação para a data de chegada que não é campo obrigatório
            if (dadosViagem.dia_chegada != null && dadosViagem.dia_chegada != undefined && dadosViagem.dia_chegada != "") {
                if (dadosViagem.dia_chegada.length != 10) return message.ERROR_REQUIRED_FIELDS;
                else dadosValidated = true;
            } else {
                dadosValidated = true;
            }

            let viagemById = await viagemDAO.selectViagensByID(id)

            if(viagemById.length > 0){
                if (dadosValidated){
                    let updateMotorista = await viagemDAO.updateViagem(id,dadosViagem);
    
                    if(updateMotorista){
                        updateMotoristaJson.viagem = dadosViagem
                        updateMotoristaJson.status = message.SUCESS_UPDATED_ITEM.status
                        updateMotoristaJson.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        updateMotoristaJson.message = message.SUCESS_UPDATED_ITEM.message
    
                        return updateMotoristaJson;
                    } else {
                         return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }else{
                return message.ERROR_NOT_FOUND
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}




module.exports = {
    getListarViagens,
    setInserirViagem,
    setDeleteViagem,
    getListarViagemById,
    getBuscarViagemByNome,
    setUpdateviagem,
    getListarViagemByIdEmpresa
}