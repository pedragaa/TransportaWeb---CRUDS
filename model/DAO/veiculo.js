/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllVeiculo = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_veiculo order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsEmpresas
    let rsVeiculos = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsVeiculos.length > 0)
     return rsVeiculos;
     else
        return false

}
const selectVeiculosByID = async function(id){
  try {
      // Realiza a busca do ator pelo ID
      let sql = `select * from tbl_veiculo where id = ${id}`;
  
      // Executa no banco de dados o script sql
      let rsVeiculos = await prisma.$queryRawUnsafe(sql);

          return rsVeiculos;
  
      } catch (error) {
          return false;
          
      }
}
const selectVeiculoByModelo = async function (modelo) {
    try {
        let sql = `select * from tbl_veiculo where modelo like "%${modelo}%"`
        let rsVeiculos = await prisma.$queryRawUnsafe(sql)
        return rsVeiculos
    } catch (error) {
        return false
    }
}
const insertVeiculo =  async function(dadosVeiculo) {
    
    try {

     let sql  = `insert into tbl_veiculo( placa, modelo, ano, tipo, capacidade_carga) values ('${dadosVeiculo.placa}', '${dadosVeiculo.modelo}', '${dadosVeiculo.ano}', '${dadosVeiculo.tipo}','${dadosVeiculo.capacidade_carga}');`
            
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
    selectAllVeiculo,
    selectVeiculoByModelo,
    selectVeiculosByID,
    insertVeiculo
}