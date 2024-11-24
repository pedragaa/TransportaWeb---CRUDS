/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllNotificacoes = async function(){

    // Script sql para listar todos os registros
    let sql = `SELECT * 
    FROM tbl_notificacao 
    WHERE id_empresa = ${id}
    ORDER BY id DESC;`
    

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsNotificacao
    let rsNotificacao = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsNotificacao.length > 0)
     return rsNotificacao;
     else
        return false

}
const selectNotificaoById = async function(id){
  try {
      // Realiza a busca do ator pelo ID
      let sql = `select * from tbl_notificacao where id = ${id}`;
  
      // Executa no banco de dados o script sql
      let rsNotificacao = await prisma.$queryRawUnsafe(sql);

          return rsNotificacao;
  
      } catch (error) {
          return false;
          
      }
}



const selectIdNotificacao = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_notificacao limit 1`;

    let empresaID = await prisma.$queryRawUnsafe(sql)
     return empresaID
    } catch (error) {
        return false
        
    }   
}

const deleteNotificacaoByID = async function(id){
  try {
      let sql = `delete from tbl_notificao where id = ${id}`

      let rsNotificacao = await prisma.$queryRawUnsafe(sql);
      return rsNotificacao;
      
  } catch (error) {
      return false
      
  }
}
const insertNotificacao =  async function(dadosNotificacao) {
    try {

     let sql  = `insert into tbl_notificacao (id_empresa, id_motorista) values '${dadosNotificacao.id_empresa}', '${dadosNotificacao.id_motorista}';`
        // Executa o script SQL no banco de dados | Devemos usar execute e não query!
        // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
        let result = await prisma.$executeRawUnsafe(sql);

        // Validação para verificar se o insert funcionou no banco de dados
        if(result)
            return true;
        else
            return false;

    } catch (error) {
        console.log(error)
        return false;
        
    }
}




module.exports = {
    selectAllNotificacoes,
    selectNotificaoById,
    deleteNotificacaoByID,
    insertNotificacao,
    selectIdNotificacao
}