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
        let sql = `SELECT m.nome AS nome_motorista, m.cpf, m.telefone, m.foto_url
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

const insertMotoristaEquipe = async function(dadosMotorista) {
    try {
        // Verificar se todos os dados necessários estão presentes
        if (!dadosMotorista.id_motorista || !dadosMotorista.id_empresa) {
            throw new Error('Campos obrigatórios ausentes ou incorretos.');
        }

        // Construir a query de inserção
        let sql = `INSERT INTO tbl_equipe (id_motorista, id_empresa) VALUES ('${dadosMotorista.id_motorista}', '${dadosMotorista.id_empresa}')`;

        // Executar a query no banco de dados
        let result = await prisma.$executeRawUnsafe(sql);

        // Validar se o resultado da inserção foi bem-sucedido
        if (result) {
            return true;
        } else {
            throw new Error('Falha ao inserir no banco de dados.');
        }

    } catch (error) {
        console.error('Erro ao inserir motorista na equipe:', error);
        throw new Error('Erro interno ao inserir motorista na equipe.');
    }
};


const selectIdEquipe = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_equipe limit 1`;

    let empresaID = await prisma.$queryRawUnsafe(sql)
     return empresaID
    } catch (error) {
        return false
        
    }   
}


const deleteMotoristaEquipe = async function(id_motorista, id_empresa) {
    try {
        // Verificar se os parâmetros necessários foram fornecidos
        if (!id_motorista || !id_empresa) {
            throw new Error('Campos obrigatórios ausentes ou incorretos.');
        }

        // Construir a query de DELETE
        let sql = `DELETE FROM tbl_equipe WHERE id_motorista = '${id_motorista}' AND id_empresa = '${id_empresa}'`;

        // Executar a query no banco de dados
        let result = await prisma.$executeRawUnsafe(sql);

        // Verificar se a exclusão foi bem-sucedida
        if (result) {
            return true;
        } else {
            throw new Error('Falha ao excluir no banco de dados.');
        }

    } catch (error) {
        console.error('Erro ao excluir motorista da equipe:', error);
        throw new Error('Erro interno ao excluir motorista da equipe.');
    }
};








module.exports = {
    selectEquipeById,
    selectEquipes,
    selectMotoristaEquipeById,
    insertMotoristaEquipe,
    selectIdEquipe,
    deleteMotoristaEquipe
}