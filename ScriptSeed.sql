insert into 
Pessoas
(Nome, Telefone, Endereco) 
values 
('Tales','9856548','Rua 4, n 1');

insert into 
Permissao 
(Adm, Entrada1, Saida1,Entrada2,Saida2, NomePerfil) 
values 
('TRUE','08:00','11:00', '14:00', '18:00', 'Adm');

insert into 
Identificador
(CodTag)
values
('2c6a7117');

insert into 
AcessoMobile
(UserMobile, PasswordMobile)
values
('admin','123');

insert into 
Colaboradores
(IdPessoa, IdPermissao, IdIdentificador, IdAcessoMobile)
values
(1,1,1,1);

select * from Pessoas;
select * from AcessoMobile;
select * from Colaboradores;
select * from Permissao;
select * from RegistroHoras;
select * from Identificador;