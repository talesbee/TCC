CREATE TABLE [Colaboradores] (
	Id int  IDENTITY(1,1) NOT NULL,
	IdPessoa int NOT NULL,
	IdPermissao int NOT NULL,
	IdAcessoMobile int NOT NULL,
	IdIdentificador int NOT NULL,
  CONSTRAINT [PK_COLABORADORES] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Pessoas] (
	Id int IDENTITY(1,1) NOT NULL,
	Nome nvarchar(max) NOT NULL,
	Telefone nvarchar(max) NOT NULL,
	Endereco nvarchar(max) NOT NULL,
  CONSTRAINT [PK_PESSOAS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [RegistroHoras] (
	Id int IDENTITY(1,1) NOT NULL,
	IdColaborador int NOT NULL,
	Data datetime2(7) NOT NULL,
  CONSTRAINT [PK_REGISTROHORAS] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Permissao] (
	Id int IDENTITY(1,1) NOT NULL,
	Adm bit NOT NULL,
	entrada1 datetime2(7) NOT NULL,
	saida1 datetime2(7) NOT NULL,
	entrada2 datetime2(7) NOT NULL,
	saida2 datetime2(7) NOT NULL,
	NomePerfil nvarchar(max) NOT NULL,
  CONSTRAINT [PK_PERMISSAO] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [Identificador] (
	Id int  IDENTITY(1,1)NOT NULL,
	CodTag nvarchar(max) NOT NULL,
  CONSTRAINT [PK_IDENTIFICADOR] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
CREATE TABLE [AcessoMobile] (
	Id int  IDENTITY(1,1)NOT NULL,
	UserMobile nvarchar(max) NOT NULL,
	PasswordMobile nvarchar(max) NOT NULL,
  CONSTRAINT [PK_ACESSOMOBILE] PRIMARY KEY CLUSTERED
  (
  [Id] ASC
  ) WITH (IGNORE_DUP_KEY = OFF)

)
GO
ALTER TABLE [Colaboradores] WITH CHECK ADD CONSTRAINT [Colaboradores_fk0] FOREIGN KEY ([IdPessoa]) REFERENCES [Pessoas]([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [Colaboradores] CHECK CONSTRAINT [Colaboradores_fk0]
GO
ALTER TABLE [Colaboradores] WITH CHECK ADD CONSTRAINT [Colaboradores_fk1] FOREIGN KEY ([IdPermissao]) REFERENCES [Permissao]([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [Colaboradores] CHECK CONSTRAINT [Colaboradores_fk1]
GO
ALTER TABLE [Colaboradores] WITH CHECK ADD CONSTRAINT [Colaboradores_fk2] FOREIGN KEY ([IdAcessoMobile]) REFERENCES [AcessoMobile]([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [Colaboradores] CHECK CONSTRAINT [Colaboradores_fk2]
GO
ALTER TABLE [Colaboradores] WITH CHECK ADD CONSTRAINT [Colaboradores_fk3] FOREIGN KEY ([IdIdentificador]) REFERENCES [Identificador]([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [Colaboradores] CHECK CONSTRAINT [Colaboradores_fk3]
GO


ALTER TABLE [RegistroHoras] WITH CHECK ADD CONSTRAINT [RegistroHoras_fk0] FOREIGN KEY ([IdColaborador]) REFERENCES [Colaboradores]([Id])
ON UPDATE CASCADE
GO
ALTER TABLE [RegistroHoras] CHECK CONSTRAINT [RegistroHoras_fk0]
GO



