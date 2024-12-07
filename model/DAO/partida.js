/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectPartida = async function(){

    // Script sql para listar todos os registros
    let sql = `select * from tbl_partida; 
`;

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsEmpresas
    let rsPartidas = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsPartidas.length > 0)
     return rsPartidas;
     else
        return false

}
const selectPartidaById = async function(id){
    
    // Script sql para listar todos os registros
    let sql = `select * from tbl_partida where id = ${id}`; 


    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsEmpresas
    let rsPartidas = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsPartidas.length > 0)
     return rsPartidas;
     else
        return false
}

const insertPartida = async function(dadosPartida){

    try {

        let sql  = `insert into tbl_partida(cep) values ('${dadosPartida.cep}')`
               
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
    selectPartida,
    selectPartidaById,
    insertPartida
}