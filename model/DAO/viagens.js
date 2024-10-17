/***********************
 * Pedro Pedraga
 * Versão 1
 ***********************/

// Import da biblioteca do prisma client
const { PrismaClient } = require ('@prisma/client')

// Instaciando o o bjeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient();

const selectAllViagens = async function(){

    let sql = `
    SELECT 
    v.id_viagem, 
    v.dia_partida, 
    v.horario_partida, 
    v.dia_chegada, 
    v.remetente, 
    v.destinatario, 
    v.status_entregue,
    p.cep AS partida_cep,
    d.cep AS destino_cep,
    m.nome AS motorista_nome,
    veiculo.modelo AS veiculo_modelo
FROM 
    tbl_viagem v
INNER JOIN 
    tbl_partida p ON v.id_partida = p.id
INNER JOIN 
    tbl_destino d ON v.id_destino = d.id
INNER JOIN 
    tbl_motorista m ON v.id_motorista = m.id
INNER JOIN 
    tbl_veiculo veiculo ON v.id_veiculo = veiculo.id
ORDER BY 
    v.id DESC;
;`;
    let rsViagrn = await prisma.$queryRawUnsafe(sql)
     if(rsViagrn.length > 0)
     return rsViagrn;
     else
        return false

}
/* const selectMotoristaViagem = async function(){

    let sql = `
    SELECT 
    v.id_viagem, v.dia_partida, v.horario_partida, v.dia_chegada, v.remetente, v.destinatario, v.status_entregue,
    p.cep AS partida_cep,
    d.cep AS destino_cep,
    m.nome AS motorista_nome,
    veiculo.modelo AS veiculo_modelo
FROM 
    tbl_viagem v
INNER JOIN tbl_partida p ON v.id_partida = p.id
INNER JOIN tbl_destino d ON v.id_destino = d.id
INNER JOIN tbl_motorista m ON v.id_motorista = m.id
INNER JOIN tbl_veiculo veiculo ON v.id_veiculo = veiculo.id;`;
    let rsViagrn = await prisma.$queryRawUnsafe(sql)
     if(rsViagrn.length > 0)
     return rsViagrn;
     else
        return false

} */
const selectViagensByID = async function(id){
  try {
      let sql = `select * from tbl_viagem where id = ${id}`;
      let rsViagrn = await prisma.$queryRawUnsafe(sql);
          return rsViagrn;
      } catch (error) {
          return false;
          
      }
}

const selectViagemByNome = async function (nome) {
    try {
        let sql = `select * from tbl_viagens where nome like "%${nome}%"`
        let rsViagrn = await prisma.$queryRawUnsafe(sql)
        return rsViagrn
    } catch (error) {
        return false
    }
}

const selectIDViagem = async function() {

    try {

    let sql = `select CAST(last_insert_id() as DECIMAL) as id from tbl_viagem limit 1`;

    let viagemId = await prisma.$queryRawUnsafe(sql)
     return viagemId
    } catch (error) {
        return false
        
    }   
}

const deleteViagemByID = async function(id){
  try {
      let sql = `delete from tbl_viagem where id = ${id}`

      let rsViagrn = await prisma.$queryRawUnsafe(sql);
      return rsViagrn;
      
  } catch (error) {
      return false
      
  }
}
const insertViagem =  async function(dadosViagem) {
    try {

     let sql  = `insert into tbl_viagem (id_viagem, dia_partida, horario_partida, dia_chegada, remetente, destinatario, status_entregue, id_partida, id_destino, id_motorista, id_veiculo) values ('${dadosViagem.id_viagem}', '${dadosViagem.dia_partida}', '${dadosViagem.horario_partida}', '${dadosViagem.dia_chegada}', '${dadosViagem.remetente}', '${dadosViagem.destinatario}', '${dadosViagem.status_entregue}', '${dadosViagem.id_partida}', '${dadosViagem.id_destino}', '${dadosViagem.id_motorista}', '${dadosViagem.id_veiculo}' )`
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

const updateEmpresa =  async function(id, dadosViagem) {
    
    try {

        let sql;
           
        sql = `update tbl_empresa set nome = '${dadosViagem.nome}', razaoSocial = '${dadosEmpresa.razaoSocial}', cep = '${dadosEmpresa.cep}',  cnpj = '${dadosEmpresa.cnpj}', numero_telefone = '${dadosEmpresa.numero_telefone}', img_perfil = '${dadosEmpresa.img_perfil}', email = '${dadosEmpresa.email}', senha ='${dadosEmpresa.senha}' where id = ${id}`
              
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
    selectAllViagens,
    selectViagensByID,
    deleteViagemByID,
    selectViagemByNome,
    insertViagem,
    updateEmpresa,
    selectIDViagem,
    //selectMotoristaViagem
}