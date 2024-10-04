CREATE SCHEMA db_transporta_web;

USE db_transporta_web;

drop table tbl_empresa;
drop table tbl_motorista;

SELECT id FROM tbl_motorista WHERE email = 'joao.silva@example.com' AND senha = 'senha123';

CREATE TABLE tbl_motorista(
id int primary key auto_increment not null,
nome varchar (150) not null,
foto_url text not null,
data_nascimento date not null,
cpf varchar (14) not null,
email varchar (100) not null,
senha varchar (32) not null
);

INSERT INTO tbl_motorista (nome, foto_url, data_nascimento, cpf, email, senha)
VALUES
('João Silva', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', '1985-01-15', '123.456.789-01', 'joao.silva@example.com', 'senha123'),
('Maria Oliveira', 'https://img.freepik.com/fotos-premium/pessoas-mulheres-negocios-e-conceito-de-retrato-rosto-de-jovem-sorridente-feliz_380164-121867.jpg', '1990-03-25', '234.567.890-12', 'maria.oliveira@example.com', 'senha123'),
('Carlos Pereira', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY2sNg-GqV-xaq5qVOdgIx_QSJsY5vH_-jAA&s', '1978-07-10', '345.678.901-23', 'carlos.pereira@example.com', 'senha123'),
('Ana Souza', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxDEo6Gwvu9iTLY2hDwVkehIQ7DEVezvO1A&s', '1982-11-05', '456.789.012-14', 'ana.souza@example.com', 'senha123'),
('Pedro Santos', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnlH6s3wv6plOo0UqtewztLNfrnq745Tmg7Q&s', '1995-06-20', '567.890.123-45', 'pedro.santos@example.com', 'senha123'),
('Paula Costa', 'https://s2-oglobo.glbimg.com/6Jszzah_XGYop6I173dS4OE4lGQ=/0x107:2362x1557/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2023/B/7/BTZjbdREKYomgDBUVfIQ/jenn-granneman-5.jpg', '1988-09-30', '678.901.234-56', 'paula.costa@example.com', 'senha123'),
('José Rocha', 'https://i1.wp.com/www.dci.com.br/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2020/09/20490-1024x682.jpg.webp', '1983-02-18', '789.012.345-67', 'jose.rocha@example.com', 'senha123');


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
