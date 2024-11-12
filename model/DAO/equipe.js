/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectEquipes = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_equipe order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsMotoristas
    let rsMotoristas = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsMotoristas.length > 0)
     return rsMotoristas;
     else
        return false

}
const selectEquipeById = async function(id){
  try {
      // Realiza a busca do ator pelo ID
      let sql = `select * from tbl_equipe where id = ${id}`;
  
      // Executa no banco de dados o script sql
      let rsEmpresas = await prisma.$queryRawUnsafe(sql);

          return rsEmpresas;
  
      } catch (error) {
          return false;
          
      }
}

const selectMotoristaEquipeById = async function(id){
    try {
        // Realiza a busca do ator pelo ID
        let sql = `SELECT m.nome AS nome_motorista, m.cpf, m.telefone
FROM tbl_equipe te
JOIN tbl_motorista m ON te.id_motorista = m.id
WHERE te.id_empresa = ${id}`;
    
        // Executa no banco de dados o script sql
        let rsEmpresas = await prisma.$queryRawUnsafe(sql);
  
            return rsEmpresas;
    
        } catch (error) {
            return false;
            
        }
}

const insertMotoristaEquipe = async function(dadosMotorista){

    try {

        let sql  = `insert into tbl_equipe(id_motorista, id_empresa) values ('${dadosMotorista.id_motorista}', '${dadosMotorista.id_empresa}')`
               
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
    selectEquipeById,
    selectEquipes,
    selectMotoristaEquipeById,
    insertMotoristaEquipe
}