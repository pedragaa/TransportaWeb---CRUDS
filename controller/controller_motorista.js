/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const motoristaDAO = require('../model/DAO/motorista.js');



const getListarMotoristas = async function(){
    
    let listaMotoristas;
    // Cria uma variavel do tipo json
    let motoristaJson = {};

    if ((listaMotoristas)){
        return listaMotoristas;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosMotorista = await motoristaDAO.selectAllDrivers();

    // Verifica se existem dados retornados do DAO
    if(dadosMotorista){
        if(dadosMotorista.length > 0){
            if(dadosMotorista.length > 0){
            
        // Montando a estrutura do JSOn
        motoristaJson.motoristas = dadosMotorista;
        motoristaJson.quantidade = dadosMotorista.length;
        motoristaJson.status_code = 200;
        // Retorna o JSON montado
        return motoristaJson; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}

const setDeleteMotorista = async function(id){
    try {
        
        let idMotorista = id;

        if(idMotorista == '' || idMotorista == undefined || isNaN(idMotorista)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await motoristaDAO.selectDriversById(idMotorista)

            if(chamarConst.length > 0){
                let dadosMotorista = await motoristaDAO.deleteMotoristaById(id)

                if(dadosMotorista){
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
const loginMotorista = async function(email, senha) {
    try {
        let motoristaJson = {};
        let dadosMotorista = await motoristaDAO.selectDriverByEmailESenha(email, senha);

        if (dadosMotorista.length === 0) {
            return { status_code: 400, message: 'Usuário não encontrado ou senha incorreta' };
        }

        console.log(dadosMotorista);
        
        // Se tudo estiver correto, retorna o usuário e uma mensagem de sucesso
        motoristaJson.usuario_id = dadosMotorista[0].id;
        motoristaJson.status_code = 200;
        motoristaJson.message = 'Login bem-sucedido';
        return motoristaJson;
    } catch (error) {
        console.log(error);
        return { status_code: 500, message: 'Erro interno do servidor' };
    }
};

const getBuscarMotoristasNome = async function (nome){
    try {
        
        let nomeMotorista = nome;
        let motoristaJson = {}
        if (nomeMotorista == '' ||nomeMotorista==undefined||!isNaN(nomeMotorista))
        return message.ERROR_INVALID_ID
        else {
            let dadosMotorista = await motoristaDAO.selectDriverByNome (nomeMotorista)
            if (dadosMotorista){
                if (dadosMotorista.length>0){
                    motoristaJson.motorista = dadosMotorista
                    motoristaJson.status_code = 200 
                    return motoristaJson
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


const getListarMotoristaById = async function (id){
   
    // Recebe o id do ator
    let idMotorista = id;

    // Variável para criar o json do atores
    let motoristaJson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idMotorista == '' || idMotorista == undefined || isNaN(idMotorista)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosMotorista = await motoristaDAO.selectDriversById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosMotorista){
            // Validação para verificar se existem dados de retorno
            if(dadosMotorista.length > 0){
            motoristaJson.motorista = dadosMotorista;
            motoristaJson.status_code = 200

            return motoristaJson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}

const setInserirNovoMotorista = async (dadosMotorista, contentType) => {

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){

    

    // Cria a variável json
    let resultDadosMotorista = {}

    // Validação de campos obrigatórios e consistência de dados
    if( dadosMotorista.nome == ''                       || dadosMotorista.nome == undefined             || dadosMotorista.nome.length > 256             ||
        dadosMotorista.data_nascimento == ''            || dadosMotorista.data_nascimento == undefined  || dadosMotorista.data_nascimento.length > 10 ||  
        dadosMotorista.cpf == ''                        || dadosMotorista.cpf == undefined              || dadosMotorista.cpf.length > 256         || 
        dadosMotorista.telefone == ''                        || dadosMotorista.telefone == undefined              || dadosMotorista.telefone.length > 256         || 
        dadosMotorista.cnh == ''                        || dadosMotorista.cnh == undefined              || dadosMotorista.cnh.length > 256         || 
        dadosMotorista.foto_url == ''                        || dadosMotorista.foto_url == undefined              || dadosMotorista.foto_url.length > 65000         || 
        dadosMotorista.email == ''                      || dadosMotorista.email == undefined            || dadosMotorista.email.length > 256       || 
        dadosMotorista.senha == ''                      || dadosMotorista.senha == undefined            || dadosMotorista.senha.length > 256       
         
        
    ){
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{

          // Variável para validar se poderemos chamar o DAO para inserir os dados
          let dadosValidated = false;

          // Validação de digitação para a data de relançamento que não é campo obrigatório
          if( dadosViagem.dia_chegada != null &&
               dadosViagem.dia_chegada != undefined && 
               dadosViagem.dia_chegada != ""
          ){
              if( dadosViagem.dia_chegada.length != 10 )
              return message.ERROR_REQUIRED_FIELDS
              else
              dadosValidated = true // Se a data estiver com exatos 10 caracteres
          }else{
              dadosValidated= true // Se a data não existir nos dados
          }
          if(dadosValidated){
   
        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novoMotorista = await motoristaDAO.insertMotorista(dadosMotorista);

        let idSelect = await motoristaDAO.selectIdMotorista();

        dadosMotorista.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novoMotorista){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultDadosMotorista.status = message.SUCESS_CREATED_ITEM.status;
            resultDadosMotorista.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultDadosMotorista.message = message.SUCESS_CREATED_ITEM.message;
            resultDadosMotorista.motorista = dadosMotorista;

            return resultDadosMotorista; // 201
        } else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500 Erro na camada do DAO (Banco)
            
    
        }
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


const setUpdateMotorista = async function(id, contentType, dadosMotorista){
    try{
        let idMotorista = id;

        if(idMotorista == '' || idMotorista == undefined || isNaN (idMotorista)){
            return message.ERROR_INVALID_ID;

           
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateMotoristaJson = {};
           // Validação de campos obrigatórios e consistência de dados
           if(dadosMotorista.nome == ''                       || dadosMotorista.nome == undefined             || dadosMotorista.nome.length > 256             ||
           dadosMotorista.data_nascimento == ''            || dadosMotorista.data_nascimento == undefined  || dadosMotorista.data_nascimento.length > 10 ||  
           dadosMotorista.cpf == ''                        || dadosMotorista.cpf == undefined              || dadosMotorista.cpf.length > 256         || 
           dadosMotorista.telefone == ''                        || dadosMotorista.telefone == undefined              || dadosMotorista.telefone.length > 256         || 
           dadosMotorista.cnh == ''                        || dadosMotorista.cnh == undefined              || dadosMotorista.cnh.length > 256         || 
           dadosMotorista.foto_url == ''                        || dadosMotorista.foto_url == undefined              || dadosMotorista.foto_url.length > 65000         || 
           dadosMotorista.email == ''                      || dadosMotorista.email == undefined            || dadosMotorista.email.length > 256       || 
           dadosMotorista.senha == ''                      || dadosMotorista.senha == undefined            || dadosMotorista.senha.length > 256    
            
    
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let validateStatus = true;

            let motoristaByID = await motoristaDAO.selectDriversById(id)

            if(motoristaByID.length > 0){
                if (validateStatus){
                    let updateMotorista = await motoristaDAO.updateMotorista(id,dadosMotorista);
    
                    if(updateMotorista){
                        updateMotoristaJson.motorista = dadosMotorista
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
        return message.ERROR_INTERNAL_SERVER
    }
}





module.exports = {
    getListarMotoristas,
    getListarMotoristaById,
    getBuscarMotoristasNome,
    setInserirNovoMotorista,
    setUpdateMotorista,
    loginMotorista,
    setDeleteMotorista
}