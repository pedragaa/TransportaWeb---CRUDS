/****************************
 * Autor: Pedro Pedraga
 * Versão 1
*****************************/

// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Import do arquivo DAO para manipular dados do banco de dados
const empresaDAO = require('../model/DAO/empresa.js');




const getListarEmpresas = async function(){
    
    let listaEmpresa;
    // Cria uma variavel do tipo json
    let empresaJson = {};

    if ((listaEmpresa)){
        return listaEmpresa;
    }else{
    
    // Chama a função do DAO para buscar os dados do banco de dados
    let dadosEmpresa = await empresaDAO.selectAllEmpresas();

    // Verifica se existem dados retornados do DAO
    if(dadosEmpresa){
        if(dadosEmpresa.length > 0){
            if(dadosEmpresa.length > 0){
            
        // Montando a estrutura do JSOn
        empresaJson.empresas = dadosEmpresa;
        empresaJson.quantidade = dadosEmpresa.length;
        empresaJson.status_code = 200;
        // Retorna o JSON montado
        return empresaJson; // 200
        }else{
            return message.ERROR_NOT_FOUND // 404
        }
        } else{
            return message.ERROR_INTERNAL_SERVER_DB // 500

    }
}
}
}

const loginEmpresa = async function(email, senha) {
    try {
        let empresaJson = {};
        let dadosEmpresa = await empresaDAO.selectEmpresaByInfo(email, senha);

        if (dadosEmpresa.length === 0) {
            return { status_code: 400, message: 'Usuário não encontrado ou senha incorreta' };
        }

        console.log(dadosEmpresa);
        
        // Se tudo estiver correto, retorna o usuário e uma mensagem de sucesso
        empresaJson.usuario_id = dadosEmpresa[0].id;
        empresaJson.status_code = 200;
        empresaJson.message = 'Login bem-sucedido';
        return empresaJson;
    } catch (error) {
        console.log(error);
        return { status_code: 500, message: 'Erro interno do servidor' };
    }
};
const getBuscarEmpresaNome = async function (nome){
    try {
        
        let nomeEmpresa = nome;
        let empresaJson = {}
        if (nomeEmpresa == '' ||nomeEmpresa==undefined||!isNaN(nomeEmpresa))
        return message.ERROR_INVALID_ID
        else {
            let dadosEmpresa = await empresaDAO.selectEmpresaByNome (nomeEmpresa)
            if (dadosEmpresa){
                if (dadosEmpresa.length>0){
                    empresaJson.empresa = dadosEmpresa
                    empresaJson.status_code = 200 
                    return empresaJson
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
const setDeleteEmpresa = async function(id){
    try {
        
        let idEmpresa = id;

        if(idEmpresa == '' || idEmpresa == undefined || isNaN(idEmpresa)){
            return message.ERROR_INVALID_ID;
        }else{
            let chamarConst = await empresaDAO.selectEmpresasById(idEmpresa)

            if(chamarConst.length > 0){
                let dadosEmpresa = await empresaDAO.deleteEmpresaById(id)

                if(dadosEmpresa){
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

const getListarEmpresaById = async function (id){
   
    // Recebe o id do ator
    let idEmpresa = id;

    // Variável para criar o json do atores
    let empresaJson = {};

    // Validação para ID vazio, indefinido ou não numérico
    if (idEmpresa == '' || idEmpresa == undefined || isNaN(idEmpresa)){
        return message.ERROR_INVALID_ID;
    }else{

        // Solicita para o DAO a busca do ator pelo iD
        let dadosEmpresa = await empresaDAO.selectEmpresasById(id)


        // Validação para verificar se existem dados encontrados
        if(dadosEmpresa){
            // Validação para verificar se existem dados de retorno
            if(dadosEmpresa.length > 0){
            empresaJson.empresa = dadosEmpresa;
            empresaJson.status_code = 200

            return empresaJson; // 200
        }else{
            return message.ERROR_NOT_FOUND; //404
        }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB; // 500
        }
    }


}
const setInserirNovaEmpresa = async (dadosEmpresa, contentType) => {

    

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){
    
    // Cria a variável json
    let resultDadosEmpresa = {}

    // Validação de campos obrigatórios e consistência de dados
    if(              
        dadosEmpresa.nome == ''                       || dadosEmpresa.nome == undefined           ||dadosEmpresa.nome.length > 256           || 
        dadosEmpresa.razaoSocial == ''                  || dadosEmpresa.razaoSocial == undefined   ||dadosEmpresa.razaoSocial.length > 256   ||
        dadosEmpresa.cep == ''                    || dadosEmpresa.cep == undefined     ||    dadosEmpresa.cep.length > 256        ||  
        dadosEmpresa.cnpj == ''                    || dadosEmpresa.cnpj == undefined     ||    dadosEmpresa.cnpj.length > 256        || 
        dadosEmpresa.numero_telefone == ''           || dadosEmpresa.numero_telefone == undefined     ||    dadosEmpresa.numero_telefone.length > 256  ||
        dadosEmpresa.img_perfil == ''           || dadosEmpresa.img_perfil == undefined     ||    dadosEmpresa.img_perfil.length > 65000  ||
        dadosEmpresa.email == ''            || dadosEmpresa.email == undefined            || dadosEmpresa.email.length > 256       || 
        dadosEmpresa.senha == ''         || dadosEmpresa.senha == undefined   || dadosEmpresa.senha.length > 256
         
        
    ){
        
        return message.ERROR_REQUIRED_FIELDS // 400 Campos obrigatórios / Incorretos
     }else{
        
        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novaEmpresa = await empresaDAO.insertEmpresa(dadosEmpresa);
        
        let idSelect = await empresaDAO.selectIdEmpresa();
        
        dadosEmpresa.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novaEmpresa){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultDadosEmpresa.status = message.SUCESS_CREATED_ITEM.status;
            resultDadosEmpresa.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultDadosEmpresa.message = message.SUCESS_CREATED_ITEM.message;
            resultDadosEmpresa.empresa = dadosEmpresa;
            console.log(dadosEmpresa)

            return resultDadosEmpresa;
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

const setUpdateEMPRESA = async function(id, contentType, dadosEmpresa){
    try{
        let idEmpresa = id;

        if(idEmpresa == '' || idEmpresa == undefined || isNaN (idEmpresa)){
            return message.ERROR_INVALID_ID;

           
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateEmpresaJson = {};
           // Validação de campos obrigatórios e consistência de dados
           if( dadosEmpresa.nome == ''                       || dadosEmpresa.nome == undefined           ||dadosEmpresa.nome.length > 256           || 
            dadosEmpresa.razaoSocial == ''                  || dadosEmpresa.razaoSocial == undefined   ||dadosEmpresa.razaoSocial.length > 256   ||
            dadosEmpresa.cep == ''                    || dadosEmpresa.cep == undefined     ||    dadosEmpresa.cep.length > 9        ||  
            dadosEmpresa.cnpj == ''                    || dadosEmpresa.cnpj == undefined     ||    dadosEmpresa.cnpj.length > 256        || 
            dadosEmpresa.numero_telefone == ''           || dadosEmpresa.numero_telefone == undefined     ||    dadosEmpresa.numero_telefone.length > 256  ||
            dadosEmpresa.img_perfil == ''           || dadosEmpresa.img_perfil == undefined     ||    dadosEmpresa.img_perfil.length > 65000  ||
            dadosEmpresa.email == ''            || dadosEmpresa.email == undefined            || dadosEmpresa.email.length > 256       || 
            dadosEmpresa.senha == ''         || dadosEmpresa.senha == undefined   || dadosEmpresa.senha.length > 256
            
    
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {

            let validateStatus = true;

            let empresaByID = await empresaDAO.selectEmpresasById(id)

            if(empresaByID.length > 0){
                if (validateStatus){
                    let updateEmpresa = await empresaDAO.updateEmpresa(id,dadosEmpresa);
    
                    if(updateEmpresa){
                      
                        updateEmpresaJson.empresa = dadosEmpresa
                        updateEmpresaJson.status = message.SUCESS_UPDATED_ITEM.status
                        updateEmpresaJson.status_code = message.SUCESS_UPDATED_ITEM.status_code
                        updateEmpresaJson.message = message.SUCESS_UPDATED_ITEM.message
    
                        return updateEmpresaJson;
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
    getListarEmpresas,
    getBuscarEmpresaNome,
    getListarEmpresaById,
    getBuscarEmpresaNome,
    setInserirNovaEmpresa,
    setUpdateEMPRESA,
    setDeleteEmpresa,
    loginEmpresa
}