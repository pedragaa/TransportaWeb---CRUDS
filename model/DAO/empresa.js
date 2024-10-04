/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllEmpresas = async function(){

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_empresa order by id desc';

    // $queryRawUnsafe(sql)  = Encaminha apenas a variável
    // $queryRaw('select * from tbl_atores) = Encaminha o script do banco 

    // Executa o script no banco de dados e recebe o retorno dos dados da variavel rsEmpresas
    let rsEmpresas = await prisma.$queryRawUnsafe(sql)
     // Para usar await a função necessita ser async(async function)

    // Tratamento de erro para retornar dados ou retornar false
     if(rsEmpresas.length > 0)
     return rsEmpresas;
     else
        return false

}
const selectEmpresasById = async function(id){
  try {
      // Realiza a busca do ator pelo ID
      let sql = `select * from tbl_empresa where id = ${id}`;
  
      // Executa no banco de dados o script sql
      let rsEmpresas = await prisma.$queryRawUnsafe(sql);

          return rsEmpresas;
  
      } catch (error) {
          return false;
          
      }
}

const selectEmpresaByInfo = async function(email, senha) {
    try {
        let sql = `SELECT id FROM tbl_empresa WHERE email = '${email}' AND senha = '${senha}'`;
        let rsEmpresas = await prisma.$queryRawUnsafe(sql);
        return rsEmpresas;
    } catch (error) {
        console.log(error);
        return false;
    }
};


const selectEmpresaByNome = async function (nome) {
    try {
        let sql = `select * from tbl_empresa where nome like "%${nome}%"`
        let rsEmpresas = await prisma.$queryRawUnsafe(sql)
        return rsEmpresas
    } catch (error) {
        return false
    }
}

const selectIdEmpresa = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_empresa limit 1`;

    let empresaID = await prisma.$queryRawUnsafe(sql)
     return empresaID
    } catch (error) {
        return false
        
    }   
}

const deleteEmpresaById = async function(id){
  try {
      let sql = `delete from tbl_empresa where id = ${id}`

      let rsEmpresas = await prisma.$queryRawUnsafe(sql);
      return rsEmpresas;
      
  } catch (error) {
      return false
      
  }
}
const insertEmpresa =  async function(dadosEmpresa) {
    try {

     let sql  = `insert into tbl_empresa (nome, razaoSocial, cep, cnpj, numero_telefone, img_perfil, email, senha) values ('${dadosEmpresa.nome}', '${dadosEmpresa.razaoSocial}', '${dadosEmpresa.cep}', '${dadosEmpresa.cnpj}', '${dadosEmpresa.numero_telefone}', '${dadosEmpresa.img_perfil}', '${dadosEmpresa.email}', '${dadosEmpresa.senha}' )`
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

const updateEmpresa =  async function(id, dadosEmpresa) {
    
    try {

        let sql;
           
        sql = `update tbl_empresa set nome = '${dadosEmpresa.nome}', razaoSocial = '${dadosEmpresa.razaoSocial}', cep = '${dadosEmpresa.cep}',  cnpj = '${dadosEmpresa.cnpj}', numero_telefone = '${dadosEmpresa.numero_telefone}', img_perfil = '${dadosEmpresa.img_perfil}', email = '${dadosEmpresa.email}', senha ='${dadosEmpresa.senha}' where id = ${id}`
              
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
    selectAllEmpresas,
    selectEmpresasById,
    deleteEmpresaById,
    selectEmpresaByNome,
    insertEmpresa,
    updateEmpresa,
    selectIdEmpresa,
    selectEmpresaByInfo
}