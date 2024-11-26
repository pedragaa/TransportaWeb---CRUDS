/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllNotificacoesEmpresa = async function(id){

    // Script sql para listar todos os registros
    let sql = `
    SELECT 
        tn.id,
        tn.id_empresa,
        tn.id_motorista,
        tc.valor AS mensagem
    FROM 
        tbl_notificacao tn
    INNER JOIN 
        tbl_configuracoes tc
    ON 
        tn.mensagem_id = tc.id
    WHERE 
        tn.id_empresa = ${id};`;

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

const selectAllNotificacoesMotorista = async function(id){

    // Script sql para listar todos os registros
    let sql = `
    SELECT 
                tn.id,
                tn.id_empresa,
                tn.id_motorista,
                tc.valor AS mensagem
            FROM 
                tbl_notificacao tn
            INNER JOIN 
                tbl_configuracoes tc
            ON 
                tn.mensagem_id = tc.id
            WHERE 
                tn.id_motorista = ${id}`;
    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsNotificacao
    let rsNotificacao = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsNotificacao.length > 0)
     return rsNotificacao;
     else
        return false
}

const insertNotificacao = async function(dadosNotificacao){
try {
    

    // Script sql para listar todos os registros
    let sql = `INSERT INTO tbl_notificacao(id_empresa, id_motorista, mensagem_id) values ('${dadosNotificacao.id_empresa}', '${dadosNotificacao.id_motorista}', '${dadosNotificacao.mensagem_id}');`;
    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsNotificacao
    let rsNotificacao = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsNotificacao.length > 0)
     return rsNotificacao;
     else
        return false
    } catch (error) {
    console.log(error)
    }
}

module.exports = {
    selectAllNotificacoesEmpresa,
    selectAllNotificacoesMotorista,
    insertNotificacao
}
