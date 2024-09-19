create schema db_transportaweb;

use db_transportaweb;

drop table tbl_empresa;
drop table tbl_motorista;

create table tbl_empresa (
id int primary key not null auto_increment,
nome varchar(64) not null,
telefone varchar(13) not null, 
cnpj varchar(18) not null,
razaoSocial varchar(64) not null,
cep varchar(9) not null,
img text not null,
email varchar(50) not null,
senha varchar(30) not null
);

create table tbl_motorista (
id int primary key not null auto_increment,
nome varchar(64) not null,
data_nascimento date not null,
cpf varchar(14) not null,
telefone varchar(13) not null,
img text not null,
email varchar(64) not null,
senha varchar(24) not null
);

create table tbl_usuarios(
id int primary key not null auto_increment,
nome varchar (64) not null,
email varchar(256) not null,
senha varchar(64) not null
);

select * from tbl_empresa;

insert into tbl_usuarios(nome, email , senha)values(
"DHL", "dhlveiculos@gmail.com", "DHL320220"),
("Pedro Pedraga", "pedropedraga160@gmail.com", "pedraga1603");

insert into tbl_empresa (nome, telefone, cnpj, razaoSocial, cep, img, email, senha) values
("DHL", 
"4003-7244", 
"92.693.975/0001-60", 
"DHL LOGISTICS (BRAZIL) LTDA",
 "03164-135",
 "https://img.freepik.com/fotos-premium/imagens-de-fundo-abstratas-e-papel-de-parede-gerados_947814-27948.jpg",
 "dhlveiculos@gmail.com", 
 "DHL320220"
 ),
("Vanderley Transportes",
 "94005-9697", 
 "42.624.357/0001-90", 
 "Vanderley Transportes LTDA", 
 "06636-220", 
 "https://img.freepik.com/fotos-premium/imagens-de-fundo-abstratas-e-papel-de-parede-gerados_947814-27948.jpg",
  "vanderley@vanderleytranportes.com.br", 
 "LeoTorquato127");
 
insert into tbl_motorista (nome, data_nascimento, cpf, telefone, img, email, senha) values
("Otávio Ribeiro Cardoso", 
"1997-10-02",
 "043.173.237-02", 
 "98160-5883", 
 "https://img.freepik.com/fotos-premium/imagens-de-fundo-abstratas-e-papel-de-parede-gerados_947814-27948.jpg", 
 "otaviocard@gmail.com", 
 "OtavianoCardosoR"),
("Maria Aparecida Loures", "1978-11-13", "043.174.238-03", "98261-5984", "https://img.freepik.com/fotos-premium/imagens-de-fundo-abstratas-e-papel-de-parede-gerados_947814-27948.jpg", "m.parecida@gmail.com", "ApareCIDALoures");