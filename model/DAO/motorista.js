/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllDrivers = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_motorista order by id desc';

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
const selectDriversById = async function(id){
  try {
      // Realiza a busca do ator pelo ID
      let sql = `select * from tbl_motorista where id = ${id}`;
  
      // Executa no banco de dados o script sql
      let rsEmpresas = await prisma.$queryRawUnsafe(sql);

          return rsEmpresas;
  
      } catch (error) {
          return false;
          
      }
}
const selectDriverByEmailESenha = async function(email, senha) {
    try {
        let sql = `SELECT id FROM tbl_motorista WHERE email = '${email}' AND senha = '${senha}'`;
        let rsMotoristas = await prisma.$queryRawUnsafe(sql);
        return rsMotoristas;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const selectDriverByNome = async function (nome) {
    try {
        let sql = `select * from tbl_motorista where nome like "%${nome}%"`
        let rsMotoristas = await prisma.$queryRawUnsafe(sql)
        return rsMotoristas
    } catch (error) {
        return false
    }
}

const selectIdMotorista = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_motorista limit 1`;

    let motoristaID = await prisma.$queryRawUnsafe(sql)
     return motoristaID
    } catch (error) {
        return false
        
    }   
}

const deleteMotoristaById = async function(id){
  try {
      let sql = `delete from tbl_motorista where id = ${id}`

      let rsMotoristas = await prisma.$queryRawUnsafe(sql);
      return rsMotoristas;
      
  } catch (error) {
      return false
      
  }
}
const insertMotorista =  async function(dadosMotorista) {
    
    try {

     let sql  = `insert into tbl_motorista( nome, data_nascimento, cpf, telefone, cnh, foto_url, email, senha ) values ('${dadosMotorista.nome}', '${dadosMotorista.data_nascimento}', '${dadosMotorista.cpf}', '${dadosMotorista.telefone}','${dadosMotorista.cnh}', '${dadosMotorista.foto_url}', '${dadosMotorista.email}', '${dadosMotorista.senha}' )`
            
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

const updateMotorista =  async function(id, dadosMotorista) {
    
    try {

        let sql;
           
        sql = `update tbl_motorista set nome = '${dadosMotorista.nome}', data_nascimento = '${dadosMotorista.data_nascimento}',  cpf = '${dadosMotorista.cpf}', telefone = '${dadosMotorista.telefone}', cnh = '${dadosMotorista.cnh}', foto_url = '${dadosMotorista.foto_url}', email = '${dadosMotorista.email}', senha = '${dadosMotorista.senha}' where id = ${id}`
              
           // Executa o script SQL no banco de dados | Devemos usar execute e não query!
           // Execute deve ser utilizado para insert, update e delete, onde o banco não devolve dados
           let result = await prisma.$executeRawUnsafe(sql);
   
           // Validação para verificar se o insert funcionou no banco de dados
           if(result )
               return true;
           else
               return false;
   
       } catch (error) {
   
           return false;
           
       }
}


module.exports = {
    selectAllDrivers,
    selectDriversById,
    deleteMotoristaById,
    selectDriverByNome,
    insertMotorista,
    updateMotorista,
    selectIdMotorista,
    selectDriverByEmailESenha
}