CREATE SCHEMA db_transporta_web;

USE db_transporta_web;

drop table tbl_empresa;
drop table tbl_motorista;

SELECT id FROM tbl_motorista WHERE email = 'joao.silva@example.com' AND senha = 'senha123';

CREATE TABLE tbl_motorista(
id int primary key auto_increment not null,
nome varchar (150) not null,
data_nascimento date not null,
cpf varchar (14) not null,
rg varchar(12) not null,
numero_cnh varchar(20) not null,
placa varchar(8) not null,	
modelo varchar(256) not null,
carga_maxima int not null,
foto_url text not null,
telefone varchar(13) not null,
email varchar (100) not null,
senha varchar (32) not null
);

INSERT INTO tbl_motorista (nome, data_nascimento, cpf, rg, numero_cnh, placa, modelo, carga_maxima, foto_url, telefone, email, senha)
VALUES
('João Silva', '1984-04-21', '47496775821', '56.843.539-4', '123.456.789-10', 'ABC1277', 'Constellation', '2.000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', '11959747737', 'joao.silva@example.com', 'senha123'),
('Leonardo Silva', '1972-04-21', '74796775821', '78.843.539-4', '321.456.789-10', 'ABH1287', 'Scania', '4.000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', '11988459010', 'leonardo.silva@example.com', 'leonardo123'),
('Luana Freire', '2000-01-12', '59596775821', '65.493.539-4', '123.456.789-10', 'CHA1277', 'Scania', '4.000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', '11959655434', 'luana.freire@example.com', 'luana123'),
('Guilherme Oito', '1945-01-29', '48596775873', '73.673.879-4', '312.654.789-10', 'BGA1405', 'Constellation', '2.000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', '11765655434', 'guilherme.oito@example.com', 'guilherme123'),
('Yasmin Quatro', '1999-02-11', '12111175821', '11.111.539-4', '111.111.789-10', 'AAA1277', 'Scania', '4.000','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', '11959651111', 'yasmin.quatro@example.com', 'yasmin123');





/*  CREATE TABLE tbl_endereco (
    id int primary key auto_increment not null,
    cep varchar(8) not null
);

INSERT INTO tbl_endereco (cep)
VALUES
('26321143'),
('40368095'),
('68909468'),
('45678901'),
('52080335'),
('22735155'),
('69312355'),
('40221255'),
('13568605'); */


drop table tbl_empresa;

CREATE TABLE tbl_empresa(
id int primary key auto_increment not null,
nome varchar (150) not null,
razaoSocial varchar(64) not null,
cep varchar(9) not null,
cnpj varchar (20) not null,
numero_telefone varchar (11) not null,
img_perfil text not null,
email varchar (100) not null,
senha varchar (32) not null
);

INSERT INTO tbl_empresa (nome, razaoSocial, cep, cnpj, numero_telefone, img_perfil, email, senha)
VALUES
('Empresa Alpha', 'Alpha Ltda', '12345-600', '12345678000190', '11987654321', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg', 'contato@alpha.com', 'senhaAlpha123'),
('Empresa Beta', 'Beta S/A', '12345-200', '22345678000190', '11987654322', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg', 'contato@beta.com', 'senhaBeta123'),
('Empresa Gamma', 'Gamma Comércio', '12336-100', '32345678000190', '11987654323', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg', 'contato@gamma.com', 'senhaGamma123'),
('Empresa Delta', 'Delta Tecnologia', '23456-600', '42345678000190', '11987654324', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg', 'contato@delta.com', 'senhaDelta123'),
('Empresa Épsilon', 'Épsilon Industrial', '32145-600', '52345678000190', '11987654325', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg', 'contato@epsilon.com', 'senhaEpsilon123'),
('Empresa Zeta', 'Zeta Serviços', '54321-600', '62345678000190', '11987654326', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg', 'contato@zeta.com', 'senhaZeta123'),
('Empresa Eta', 'Eta Ltda', '12392-600', '72345678000190', '11987654327', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg', 'contato@eta.com', 'senhaEta123'),
('Empresa Theta', 'Theta Comércio', '12332-600', '82345678000190', '11987654328', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg', 'contato@theta.com', 'senhaTheta123'),
('Empresa Iota', 'Iota Consultoria', '54321-450', '92345678000190', '11987654329', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg', 'contato@iota.com', 'senhaIota123');


CREATE TABLE tbl_avaliacao (
  id int primary key auto_increment not null,
  avaliacao int not null,
  CONSTRAINT chk_avaliacao CHECK (avaliacao BETWEEN 1 AND 5)
);

INSERT INTO tbl_avaliacao (avaliacao)
VALUES
(5),
(4),
(3),
(5),
(2),
(1),
(4);

CREATE TABLE tbl_veiculo (
    id int primary key auto_increment not null,
    placa varchar(9) not null,
    modelo varchar(50) not null,
    ano varchar(4) not null,
    tipo varchar(30) not null,
    capacidade_carga decimal(10, 2) not null
);

INSERT INTO tbl_veiculo (placa, modelo, ano, tipo, capacidade_carga)
VALUES
('ABC1D23', 'Caminhão Volvo FH', '2020', 'Caminhão', 18000.00),
('DEF4G56', 'Fiat Ducato', '2018', 'Van', 1500.00),
('GHI7J89', 'Mercedes-Benz Sprinter', '2019', 'Furgão', 2000.00),
('JKL0M12', 'Volkswagen Delivery', '2021', 'Caminhão Leve', 5000.00),
('NOP3Q45', 'Ford Cargo 816', '2022', 'Caminhão Médio', 8000.00);


drop table tbl_motorista_avaliacao;

CREATE TABLE tbl_motorista_avaliacao(
id int primary key auto_increment not null,
id_motorista int not null,
id_avaliacao int not null,

foreign key(id_motorista) references tbl_motorista(id) ON DELETE CASCADE,
FOREIGN KEY(id_avaliacao) REFERENCES tbl_avaliacao(id) ON DELETE CASCADE
);

INSERT INTO tbl_motorista_avaliacao (id_motorista, id_avaliacao)
VALUES
(1, 5),
(2, 4),
(3, 3),
(4, 5),
(5, 2);

drop table tbl_motorista_veiculo;

CREATE TABLE tbl_motorista_veiculo(
id int primary key auto_increment not null,
id_motorista int not null,
id_veiculo int not null,

foreign key(id_motorista) references tbl_motorista(id) ON DELETE CASCADE,
FOREIGN KEY(id_veiculo ) REFERENCES tbl_veiculo(id) ON DELETE CASCADE
);

INSERT INTO tbl_motorista_veiculo (id_motorista, id_veiculo)
VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

CREATE TABLE tbl_partida(
id int primary key auto_increment not null,
rua varchar(150) not null,
numero varchar(10) not null,
complemento varchar(50),
bairro varchar(50) not null,
cidade varchar(100) not null,
estado varchar(2) not null,
cep varchar(9) not null
);

CREATE TABLE tbl_destino(
id int primary key auto_increment not null,
rua varchar(150) not null,
numero varchar(10) not null,
complemento varchar(50),
bairro varchar(50) not null,
cidade varchar(100) not null,
estado varchar(2) not null,
cep varchar(9) not null
);

drop table tbl_viagem;

CREATE TABLE tbl_viagem(
id int primary key auto_increment not null,
id_viagem varchar(11) not null,
dia_partida date not null,
dia_chegada date,
remetente varchar(150) not null,
destinatario varchar(150) not null,
status_entregue boolean not null,
id_partida int not null,
id_destino int null,
id_motorista int null,

foreign key(id_partida) references tbl_partida(id) ON DELETE CASCADE,
FOREIGN KEY(id_destino) REFERENCES tbl_destino(id) ON DELETE CASCADE,
FOREIGN KEY(id_motorista) REFERENCES tbl_motorista(id) ON DELETE CASCADE

);

CREATE TABLE tbl_carga(
id int primary key auto_increment not null,
descricao varchar(255) not null,
peso decimal(10, 2) not null,
tipo varchar(50) not null,
valor decimal(10, 2)
);

drop table tbl_viagem_carga;

CREATE TABLE tbl_viagem_carga(
id int primary key auto_increment not null,
id_viagem int not null,
id_carga int not null,

FOREIGN KEY(id_viagem) REFERENCES tbl_viagem(id) ON DELETE CASCADE,
FOREIGN KEY(id_carga) REFERENCES tbl_carga(id) ON DELETE CASCADE

);