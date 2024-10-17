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
const setInserirViagem = async (dadosViagem, contentType) => {

    try{

   
    if(String(contentType).toLowerCase() == 'application/json'){

    

    // Cria a variável json
    let resultdadosViagem = {}

    // Validação de campos obrigatórios e consistência de dados
    if( dadosViagem.id_viagem == ''                       || dadosViagem.id_viagem == undefined             || dadosViagem.id_viagem.length > 11             ||
        dadosViagem.dia_partida == ''                        || dadosViagem.dia_partida == undefined              || dadosViagem.dia_partida.length > 10         ||
        dadosViagem.horario_partida == ''                        || dadosViagem.horario_partida == undefined              || dadosViagem.horario_partida.length > 8         || 
        // dadosViagem.dia_chegada == ''            || dadosViagem.dia_chegada == undefined  || dadosViagem.dia_chegada.length > 10 ||  
        dadosViagem.remetente == ''                        || dadosViagem.remetente == undefined              || dadosViagem.remetente.length > 256         || 
        dadosViagem.destinatario == ''                      || dadosViagem.destinatario == undefined            || dadosViagem.destinatario.length > 256       || 
        dadosViagem.status_entregue == ''                      || dadosViagem.status_entregue == undefined            || dadosViagem.status_entregue.length > 1    ||   
        dadosViagem.id_partida == ''                      || dadosViagem.id_partida == undefined            || dadosViagem.id_partida.length > 1   ||  
        dadosViagem.id_destino == ''                      || dadosViagem.id_destino == undefined            || dadosViagem.id_destino.length > 1    ||         
        dadosViagem.id_motorista == ''                      || dadosViagem.id_motorista == undefined            || dadosViagem.id_motoristalength > 1    ||  
        dadosViagem.id_veiculo == ''                      || dadosViagem.id_veiculo == undefined            || dadosViagem.id_veiculo.length > 1       
         
        
    ){
        console.log(dadosViagem)
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
          // Validação para verificar se podemos encaminhar os dados para o DAO
          if(dadosValidated){
  
   
        // Encaminha os dados para o DAO, inserir no Banco de Dados
        let novoMotorista = await viagemDAO.insertViagem(dadosViagem);

        let idSelect = await viagemDAO.selectIDViagem();

        dadosViagem.id = Number (idSelect[0].id)
        
        // Validação de inserção de dados no banco de dados 
        if(novoMotorista){

           
            // Cria o padrão de JSOn para o retorno dos dados criados no banco de dados
            resultdadosViagem.status = message.SUCESS_CREATED_ITEM.status;
            resultdadosViagem.status_code = message.SUCESS_CREATED_ITEM.status_code;
            resultdadosViagem.message = message.SUCESS_CREATED_ITEM.message;
            resultdadosViagem.viagem = dadosViagem;

            return resultdadosViagem; // 201
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
module.exports = {
    getListarViagens,
    setInserirViagem,
    setDeleteViagem
}