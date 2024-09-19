const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllUsers = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_usuarios order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsMotoristas
    let rsUsuarios = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsUsuarios.length > 0)
     return rsUsuarios;
     else
        return false

}

module.exports = {
    selectAllUsers
}