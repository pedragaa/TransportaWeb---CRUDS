CREATE SCHEMA db_transporta_web;

drop schema db_transporta_web;

USE db_transporta_web;

CREATE TABLE tbl_motorista(
id int primary key auto_increment not null,
nome varchar (150) not null,
data_nascimento date not null,
cpf varchar (14) not null,
telefone varchar(13) not null,
cnh varchar(20) not null,
foto_url text not null,
email varchar (100) not null,
senha varchar (32) not null,
disponibilidade_status boolean not null
);

INSERT INTO tbl_motorista (nome, data_nascimento, cpf, telefone, cnh, foto_url, email, senha, disponibilidade_status)
VALUES
('João Silva', '1984-04-21', '47496775821', '11959747737', ' 12345678901', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', 'joao.silva@example.com', 'senha123', TRUE),
('Leonardo Silva', '1972-04-21', '74796775821', '11988459010', '98765432109', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', 'leonardo.silva@example.com', 'leonardo123', TRUE),
('Luana Freire', '2000-01-12', '59596775821', '11959655434', '10293847562', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', 'luana.freire@example.com', 'luana123', FALSE),
('Guilherme Oito', '1945-01-29', '48596775873', '11765655434', '89193847562', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', 'guilherme.oito@example.com', 'guilherme123', FALSE),
('Yasmin Quatro', '1999-02-11', '12111175821',  '11959651111', '27654847562', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS97h5PsMDsjpHqK3_jSbKU2OS1VMQVsKYAzg&s', 'yasmin.quatro@example.com', 'yasmin123', FALSE);

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


CREATE TABLE tbl_partida(
id int primary key auto_increment not null,
cep varchar(9) not null
);

INSERT INTO tbl_partida (cep) 
VALUES 
('75085-730'),
('69914-640'),
('88520-600'),
('89046-445'),
('59156-745');


CREATE TABLE tbl_destino(
id int primary key auto_increment not null,
cep varchar(9) not null
);

INSERT INTO tbl_destino (cep) 
VALUES 
('77064-043'),
('74975-195'),
('93544-010'),
('66055-904'),
('50751-310');



CREATE TABLE tbl_viagem(
id int primary key auto_increment not null,
id_viagem varchar(11) not null,
dia_partida date not null,
horario_partida time not null,
dia_chegada date,
remetente varchar(150) not null,
destinatario varchar(150) not null,
status_entregue boolean not null,
id_partida int not null,
id_destino int null,
id_motorista int null,
id_veiculo int null,

foreign key(id_partida) references tbl_partida(id) ON DELETE CASCADE,
FOREIGN KEY(id_destino) REFERENCES tbl_destino(id) ON DELETE CASCADE,
FOREIGN KEY(id_motorista) REFERENCES tbl_motorista(id) ON DELETE CASCADE,
FOREIGN KEY(id_veiculo) REFERENCES tbl_veiculo(id) ON DELETE CASCADE

);

INSERT INTO tbl_viagem (
    id_viagem, dia_partida, horario_partida, dia_chegada, remetente, destinatario, status_entregue, id_partida, id_destino, id_motorista, id_veiculo
) 
VALUES
('412-639-JTO', '2024-10-10', '08:30:00', '2024-10-11', 'Empresa Alpha', 'Cliente A', true, 1, 1, 1, 1),
('312-539-BKU', '2024-10-12', '09:00:00', '2024-10-13', 'Empresa Beta', 'Cliente B', true, 2, 2, 2, 2),
('612-839-MQZ', '2024-10-13', '10:15:00', NULL, 'Empresa Gamma', 'Cliente C', false, 3, 3, 3, 3),
('412-739-LNW', '2024-10-14', '14:00:00', '2024-10-15', 'Empresa Delta', 'Cliente D', true, 4, 4, 4, 4),
('712-939-VCD', '2024-10-15', '15:30:00', NULL, 'Empresa Épsilon', 'Cliente E', false, 5, 5, 5, 5);

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
INNER JOIN tbl_veiculo veiculo ON v.id_veiculo = veiculo.id;




CREATE TABLE tbl_tipo_carga(
id int primary key auto_increment not null,
nome varchar(50) not null
);

INSERT INTO tbl_tipo_carga (nome)
VALUES
('Frágil'),
('Perigosa'),
('Perecível'),
('Líquida'),
('Alto Valor'),
('Inflamável');


CREATE TABLE tbl_carga(
id int primary key auto_increment not null,
descricao varchar(255) not null,
peso decimal(10, 2) not null,
id_tipo_carga int not null,

foreign key(id_tipo_carga) references tbl_tipo_carga(id) ON DELETE CASCADE

);


CREATE TABLE tbl_viagem_carga(
id int primary key auto_increment not null,
id_viagem int not null,
id_carga int not null,

FOREIGN KEY(id_viagem) REFERENCES tbl_viagem(id) ON DELETE CASCADE,
FOREIGN KEY(id_carga) REFERENCES tbl_carga(id) ON DELETE CASCADE

);

INSERT INTO tbl_carga (descricao, peso, id_tipo_carga)
VALUES
('Caixas de vidro para transporte delicado', 150.50, 1), 
('Produtos químicos inflamáveis', 250.75, 2),        
('Alimentos congelados para supermercados', 500.00, 3),   
('Transporte de combustível', 1000.00, 4),            
('Equipamentos eletrônicos de alto valor', 120.25, 5);    


CREATE TABLE tbl_equipe (
id int primary key auto_increment not null,
id_motorista int not null,
id_empresa int not null,

FOREIGN KEY(id_motorista) REFERENCES tbl_motorista(id) ON DELETE CASCADE,
FOREIGN KEY(id_empresa) REFERENCES tbl_empresa(id) ON DELETE CASCADE

);

CREATE TABLE tbl_postagem (
id int primary key auto_increment not null,
id_viagem varchar(11) not null,
descricao varchar(255) not null,
valor decimal(10,2),
dia_partida date not null,
horario_partida time not null,
dia_chegada date,
remetente varchar(150) not null,
destinatario varchar(150) not null,
status_entregue boolean not null,
id_partida int not null,
id_destino int null
);



