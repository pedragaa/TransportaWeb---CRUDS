
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
    const controllerViagem = require('./controller/controller_viagem')
    const motoristaVeiculo = require('./controller/controller_motoristaveiculo')
    const controllerCarga = require('./controller/controller_carga')
    const controllerVeiculo = require('./controller/controller_veiculo.js')
    const controllerDestino = require('./controller/controller_destino.js')
    const controllerPartida = require('./controller/controller_partida.js')

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

// Para a empresa poder editar seu perfil
app.put('/v1/transportaweb/empresa/:id', cors(), bodyParserJSON, async function(request,response, next){
    let idEmpresa = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dadosEmpresa = await controllerEmpresa.setUpdateEMPRESA(idEmpresa, contentType, dadosBody);

    response.status(dadosEmpresa.status_code);
    response.json(dadosEmpresa)
})




// Deleta um filme a partir de seu ID
app.delete('/v1/transportaweb/deleteempresa/:id', cors(), async function(request, response, next){

    let idEmpresa = request.params.id

    let resultDados = await controllerEmpresa.setDeleteEmpresa(idEmpresa);

    response.status(resultDados.status_code);
    response.json(resultDados);
})

app.post('/v1/transportaweb/empresa/login', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type'];

    // Recebe todos os dados encaminhados na requisição pelo Body
    let dadosBody = request.body;

    // Encaminha os dados para a controller realizar o login
    let resultadoLogin = await controllerEmpresa.loginEmpresa(dadosBody.email, dadosBody.senha, contentType);

    response.status(resultadoLogin.status_code);
    response.json(resultadoLogin);
});



/*******************************************************************/
//                           MOTORISTAS                            //
/*******************************************************************/


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
app.get('/v1/transportaweb/motoristas/filtro', cors(), async function (request, response, next) {
    let nomeMotorista = request.query.nome;

    console.log(nomeMotorista);

    let dadosMotorista = await controllerMotorista.getBuscarMotoristasNome(nomeMotorista);

    response.status(dadosMotorista.status_code || 500);
    response.json(dadosMotorista);
});

app.get('/v1/transportaweb/motorista/:id', cors(), async function(request, response, next){

    let idMotorista = request.params.id

    let resultDados = await controllerMotorista.getListarMotoristaById(idMotorista);

    response.status(resultDados.status_code);
    response.json(resultDados);
})

app.post('/v1/transportaweb/motorista/login', cors(), bodyParserJSON, async function(request, response) {
    // Recebe o content-type da requisição
    let contentType = request.headers['content-type'];

    // Recebe todos os dados encaminhados na requisição pelo Body
    let dadosBody = request.body;

    // Encaminha os dados para a controller realizar o login
    let resultadoLogin = await controllerMotorista.loginMotorista(dadosBody.email, dadosBody.senha, contentType);

    response.status(resultadoLogin.status_code);
    response.json(resultadoLogin);
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

    let resultDados = await controllerMotorista.setDeleteMotorista(idMotorista);

    response.status(resultDados.status_code);
    response.json(resultDados);
})

// Para o motorista poder editar seu perfil
app.put('/v1/transportaweb/editmotorista/:id', cors(), bodyParserJSON, async function(request,response, next){
    let idMotorista = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dadosMotorista = await controllerMotorista.setUpdateMotorista(idMotorista, contentType, dadosBody);

    response.status(dadosMotorista.status_code);
    response.json(dadosMotorista)
})




/*******************************************************************/
//                             VIAGENS                             //
/*******************************************************************/



app.get('/v1/transportaweb/viagens', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosViagem = await controllerViagem.getListarViagens();

    // Validação para verificar se existem dados
    if(dadosViagem){
        response.json(dadosViagem)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});


app.post('/v1/transportaweb/newviagem', cors(), bodyParserJSON, async function(request, response,next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];

   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;
   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let resultDados = await controllerViagem.setInserirViagem(dadosBody, contentType);

   response.status(resultDados.status_code);
   response.json(resultDados);
})
// Para o motorista poder editar seu perfil
app.put('/v1/transportaweb/editviagem/:id', cors(), bodyParserJSON, async function(request,response, next){
    let idViagem = request.params.id
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dadosViagem = await controllerViagem.setUpdateviagem(idViagem, contentType, dadosBody);

    response.status(dadosViagem.status_code);
    response.json(dadosViagem)
})



app.delete('/v1/transportaweb/viagem/:id', cors(), async function(request, response, next){

    let idViagem = request.params.id

    let resultDados = await controllerViagem.setDeleteViagem(idViagem);

    response.status(resultDados.status_code);
    response.json(resultDados);
})
app.get('/v1/transportaweb/viagem/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idViagem = request.params.id;

 
    let dadosViagem = await controllerViagem.getListarViagemById(idViagem);

     response.status(dadosViagem.status_code);
    response.json(dadosViagem);
   
});

app.get('/v1/transportaweb/viagens/filtro', cors(), async function (request, response, next) {
    let idviagem = request.query.id_viagem;

    console.log(idviagem);

    let dadosViagem = await controllerViagem.getBuscarViagemByNome(idviagem);

    response.status(dadosViagem.status_code || 500);
    response.json(dadosViagem);
});

/*******************************************
 * Intermediárias
 *******************************************/


app.post('/v1/transportaweb/motoristaveiculo', cors(), bodyParserJSON, async function(request, response,next){

    // Recebe o content-type da requisição (API deve receber application/json )
   let contentType = request.headers['content-type'];

   // Recebe os dados encaminhados na requisição do body (JSON)
   let dadosBody = request.body;
   
   // Encaminha os dados da requisição para a controller enviar para o banco de dados
   let resultDados = await motoristaVeiculo.setInserirNovoMotoristaVeiculo(dadosBody, contentType);

   response.status(resultDados.status_code);
   response.json(resultDados);
})

/*******************************************
 * Cargas
 *******************************************/


app.get('/v1/transportaweb/cargas', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosCarga = await controllerCarga.getListarCargas();

    // Validação para verificar se existem dados
    if(dadosCarga){
        response.json(dadosCarga)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.get('/v1/transportaweb/carga/:id', cors(), async function(request, response, next){

    let idCarga = request.params.id

    let resultDados = await controllerCarga.getListarCargaById(idCarga);

    response.status(resultDados.status_code);
    response.json(resultDados);
})


/*******************************************************************/
//                           Veiculosss                            //
/*******************************************************************/


app.get('/v1/transportaweb/veiculos', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosVeiculo = await controllerVeiculo.getListarVeiculos();

    // Validação para verificar se existem dados
    if(dadosVeiculo){
        response.json(dadosVeiculo)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.get('/v1/transportaweb/veiculo/:id', cors(), async function(request, response, next){

    let idveiculo = request.params.id

    let resultDados = await controllerVeiculo.getListarveiculoBYID(idveiculo);

    response.status(resultDados.status_code);
    response.json(resultDados);
})
/*******************************************************************/
//                           DEstinosos                            //
/*******************************************************************/


app.get('/v1/transportaweb/destinos', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosDestino = await controllerDestino.getListarDestinos();

    // Validação para verificar se existem dados
    if(dadosDestino){
        response.json(dadosDestino)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.get('/v1/transportaweb/destino/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idDestino = request.params.id;

 
    let dadosDestino = await controllerDestino.getListarDestinosById(idDestino);

     response.status(dadosDestino.status_code);
    response.json(dadosDestino);
   
});
/*******************************************************************/
//                           Partidasss                            //
/*******************************************************************/


app.get('/v1/transportaweb/partidas', cors(), async function(request,response,next){
    
    // Chama a função para retornar os dados do filme
    let dadosPartida = await controllerPartida.getListarPartidas();

    // Validação para verificar se existem dados
    if(dadosPartida){
        response.json(dadosPartida)
        response.status(200);
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status()
    }
});

app.get('/v1/transportaweb/partida/:id', cors(), async function(request, response, next){
    // Recebe o id da requisição 
    let idPartida = request.params.id;

 
    let dadosPartida = await controllerPartida.getListarPartidasByID(idPartida);

     response.status(dadosPartida.status_code);
    response.json(dadosPartida);
   
});

app.listen(8080, function(){
    console.log('Tá funcionando, testa aí');
})
