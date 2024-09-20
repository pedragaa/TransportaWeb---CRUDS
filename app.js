/********************************************************
 * Objetivo: Arquivo para realizar as requisições de filmes
 * Data: 30/01/2024
 * Autor: Pedro Pedraga
 * Versão: 1.0
 ********************************************************/

/**********************************************
 * Para realizar a conexão com o banco de dados 
 * precisamos utilizar uma dependencia:
 *    - SEQUELIZE ORM
 *    - PRISMA    ORM 
 *    - FASTFY    ORM
 * 
 * Prisma - Para utilizar o prisma é necessário os comandos abaixos
 *     npm install prisma --save
 *     npm install @prisma/client --save
 *     
 * Para inicializar o prisma:
 *     npx prisma init
 * 
 *******************************************/

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Cria um objeto do tipo JSON para receber os dados via body nas requisições POST ou PUT
const bodyParserJSON = bodyParser.json();

//request - Receber dados
//response - Devolve dados

// *************************** Imports de arquivos e bibliotecas ************************************ //

    const controllerEmpresa = require('./controller/controller_empresa');
    const controllerMotorista = require('./controller/controller_motorista')
   


// ************************************************************************************************* //
//Função para configurar as permissões do cors
app.use((request, response, next)=>{
    //Configura quem poderá fazer requisições na API (* - libera para todos | IP restringe o acesso)
    response.header('Access-Control-Allow-Origin', '*');
    //Configura os metodos que poderão ser utilizados na API (GET, POST, PUT e DELETE)
    response.header('Access-Control-Allow-Methods', 'GET');
    app.use(cors());

    next();
})

app.get('/v1/transportaweb/empresas', cors(), async function(request,response,next){
    
        // Chama a função para retornar os dados do filme
        let dadosEmpresa = await controllerEmpresa.getListarEmpresas();

        // Validação para verificar se existem dados
        if(dadosEmpresa){
            response.json(dadosEmpresa)
            response.status(200);
        }else{
            response.json({message: 'Nenhum registro encontrado'})
            response.status()
        }
    });



app.get('/v1/transportaweb/empresa/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idEmpresa = request.params.id;

 
    let dadosEmpresa = await controllerEmpresa.getListarEmpresaById(idEmpresa);

     response.status(dadosEmpresa.status_code);
    response.json(dadosEmpresa);
   
});

// Endpoint : Para inserir novos filmes no banco de dados
    // Não esquecer de colocar a variável(Início do código) que retorna os dados no formato JSON
app.post('/v1/transportaweb/insertempresa', cors(), bodyParserJSON, async function(request, response,next){

     // Recebe o content-type da requisição (API deve receber application/json )
    let contentType = request.headers['content-type'];

    // Recebe os dados encaminhados na requisição do body (JSON)
    let dadosBody = request.body;
    
    // Encaminha os dados da requisição para a controller enviar para o banco de dados
    let resultDados = await controllerEmpresa.setInserirNovaEmpresa(dadosBody, contentType);

    response.status(resultDados.status_code);
    response.json(resultDados);
})

// Deleta um filme a partir de seu ID
app.delete('/v1/transportaweb/deleteempresa/:id', cors(), async function(request, response, next){

    let idEmpresa = request.params.id

    let resultDados = await controllerEmpresa.setDeleteEmpresa(idEmpresa);

    response.status(resultDados.status_code);
    response.json(resultDados);
})



app.get('/v1/transportaweb/motoristas', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosMotorista = await controllerMotorista.getListarMotoristas();

    // Validação para verificar se existem dados
    if(dadosMotorista){
        response.json(dadosMotorista)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.post('/v1/transportaweb/insertmotorista', cors(), bodyParserJSON, async function(request, response,next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];

   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;
   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let resultDados = await controllerMotorista.setInserirNovoMotorista(dadosBody, contentType);

   response.status(resultDados.status_code);
   response.json(resultDados);
})



app.delete('/v1/transportaweb/deletemotorista/:id', cors(), async function(request, response, next){

    let idMotorista = request.params.id

    let resultDados = await controllerMotorista.se(idMotorista);

    response.status(resultDados.status_code);
    response.json(resultDados);
})



app.listen(8080, function(){
    console.log('Tá funcionando, testa aí');
})