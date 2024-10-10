/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllMotoristasVeiculos = async function(){

    let sql = 'select * from tbl_motorista_veiculo order by id desc';
    let rsTblIntermediaria = await prisma.$queryRawUnsafe(sql)
     if(rsTblIntermediaria.length > 0)
     return rsTblIntermediaria;
     else
        return false

}
const selectMotoristaVeiculoById = async function(id){
  try {
      let sql = `select * from  tbl_motorista_veiculo where id = ${id}`;
      let rsTblIntermediaria = await prisma.$queryRawUnsafe(sql);
          return rsTblIntermediaria;
      } catch (error) {
          return false;
          
      }
}

module.exports = {
    selectAllMotoristasVeiculos,
    selectMotoristaVeiculoById
}