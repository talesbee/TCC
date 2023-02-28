select
p.Nome,
pm.NomePerfil, 
ac.UserMobile,
ac.PasswordMobile,
i.CodTag

from Colaboradores c

inner join Pessoas p on p.Id = c.IdPessoa
inner join Permissao pm on pm.Id = c.IdPermissao
inner join AcessoMobile ac on ac.Id = c.IdAcessoMobile
inner join Identificador i on i.Id = c.IdIdentificador

select * from [RegistroHoras]