insert into 
Pessoas 
(Nome, Telefone, Endereco) 
values 
('Tales','9856548','Rua 4, n 1');

insert into 
Permissao 
(Adm, Entrada1, Saida1,Entrada2,Saida2) 
values 
('TRUE','08:00','11:00', '14:00', '18:00');

insert into 
Identificador
(CodTag)
values
('123');

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