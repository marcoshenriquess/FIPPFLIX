
create table tb_plano (
	pla_id int not null primary key auto_increment,
    pla_nome varchar(100),
    pla_descricao varchar(200),
    pla_valor decimal(8,2)
);

insert into tb_plano (pla_nome, pla_descricao, pla_valor) values ('FIPPFLIX Standard', 'Esse plano permite acesso à uma tela e conteúdos em HD', 24.90);
insert into tb_plano (pla_nome, pla_descricao, pla_valor) values ('FIPPFLIX Premium', 'Esse plano permite acesso à quatro telas e conteúdos em 4K', 34.90);

create table tb_perfil (
	per_id int not null primary key auto_increment,
    per_nome varchar(100)
);

insert into tb_perfil (per_nome) values ('Administrador');
insert into tb_perfil (per_nome) values ('Cliente');



create table tb_usuario (
	usu_id int not null primary key auto_increment,
    usu_email varchar(100),
    usu_senha varchar(200),
    usu_nome varchar(100),
    usu_datacadastro datetime,
    per_id int,
    
    foreign key (per_id) references tb_perfil (per_id)  
);

create table tb_pagamento  (
	pag_id int not null primary key auto_increment,
    pag_data datetime,
    usu_id int,
    pla_id int,
    
	 foreign key (usu_id) references tb_usuario (usu_id),
     foreign key (pla_id) references tb_plano (pla_id)
);

create table tb_usuariolista (
	usl_id int not null primary key auto_increment,
    usu_id int,
    con_id int,
    
     foreign key (usu_id) references tb_usuarioreg (usu_id),
     foreign key (con_id) references tb_conteudo (con_id)
);

create table tb_categoria (
	cat_id int not null primary key auto_increment,
    cat_descricao varchar(200)
);

create table tb_conteudo (
	con_id int not null primary key auto_increment,
    con_youtubeid varchar(200),
    con_titulo varchar(200),
    con_disponivel varchar(1),
    cat_id int,
    
    foreign key (cat_id) references tb_categoria (cat_id)  
);

insert into tb_categoria (cat_descricao) values ('Tecnologia');
insert into tb_categoria (cat_descricao) values ('Notícias');
insert into tb_categoria (cat_descricao) values ('Esportes');

insert into tb_conteudo (con_youtubeid, con_titulo, con_disponivel, cat_id) values
('Qtc_F-MFZjE', 'Apresentação do novo iPhone 15', 'S', 1)


-- PROJETO FIPPFLIX
-- Competências funcionais
-- A plataforma deverá ser dividida em três partes: Área Administrativa, Área do cliente e Área publica
	-- A área publica da plataforma deverá ter uma tela de apresentação do serviço de streaming (o que é, planos, etc...) 
    -- 			e também uma tela com o formulário para um novo usuário se registrar. Quando o usuário terminar de preencher seus dados, 
	-- 			ele deverá escolher um plano e realizar o pagamento (usar o Stripe) e ter acesso à área do cliente
    -- A área do cliente será a interface para assistir os conteúdos, onde ele poderá visualizar os conteúdos por categoria e também pesquisar conteúdos pelo nome. 
	-- 			Ele poderá também criar uma lista dos seus conteúdos. Se o cliente logado possuir uma lista criada, ela deverá aparecer antes do outros conteúdos separados por categoria.
	-- A área administrativa deverá permitir o gerenciamento dos conteúdos e também a visualização dos pagamentos efetuados
    
-- Competências tecnologicas
-- Backend
	-- Node/express
    -- Swagger (Rotas, Tags, Schemas, e Fields e Authentication)
    -- Middleware para validar as requisições
-- Frontend
	-- Next/React
    -- Middleware para validar a navegação das páginas
    -- Context API para personalizar a interface do usuário logado
    

