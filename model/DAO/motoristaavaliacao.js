/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllMotoristasAvaliacoes = async function(){

    let sql = 'select * from tbl_motorista_avaliacao order by id desc';
    let rsTblIntermediaria = await prisma.$queryRawUnsafe(sql)
     if(rsTblIntermediaria.length > 0)
     return rsTblIntermediaria;
     else
        return false

}
const selectMotoristaAvaliacaoById = async function(id){
  try {
      let sql = `select * from  tbl_motorista_avaliacao where id = ${id}`;
      let rsTblIntermediaria = await prisma.$queryRawUnsafe(sql);
          return rsTblIntermediaria;
      } catch (error) {
          return false;
          
      }
}
const selectIdMotoristaAvaliacao = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_motorista_avaliacao limit 1`;

    let motoristaID = await prisma.$queryRawUnsafe(sql)
     return motoristaID
    } catch (error) {
        return false
        
    }   
}


const insertMotoristaAvaliacao =  async function(dadosMotoristaAvaliacao) {
    
    try {

     let sql  = `insert into tbl_motorista_avaliacao(id_motorista, id_avaliacao) values ('${dadosMotoristaAvaliacao.id_motorista}', '${dadosMotoristaAvaliacao.id_avaliacao}')`  
            
        // Executa o script SQL no banco de dados | Devemos usar execute e não query!
        // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
        let result = await prisma.$executeRawUnsafe(sql);

        // Validação para verificar se o insert funcionou no banco de dados
        if(result )
            return true;
        else
            return false;

    } catch (error) {
        console.log(error)
        return false;
        
    }
}

module.exports = {
    insertMotoristaAvaliacao,
    selectAllMotoristasAvaliacoes,
    selectIdMotoristaAvaliacao,
    selectMotoristaAvaliacaoById
}