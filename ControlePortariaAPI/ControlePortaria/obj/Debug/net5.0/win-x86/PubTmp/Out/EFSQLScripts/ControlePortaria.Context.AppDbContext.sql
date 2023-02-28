IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604180647_n1')
BEGIN
    CREATE TABLE [AcessoMobile] (
        [Id] int NOT NULL IDENTITY,
        [UserMobile] int NOT NULL,
        [PasswordMobile] int NOT NULL,
        CONSTRAINT [PK_AcessoMobile] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604180647_n1')
BEGIN
    CREATE TABLE [Colaboradores] (
        [Id] int NOT NULL IDENTITY,
        [IdPessoa] int NOT NULL,
        [IdPermissao] int NOT NULL,
        [IdIdentificador] int NOT NULL,
        [IdAcessoMobile] int NOT NULL,
        CONSTRAINT [PK_Colaboradores] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604180647_n1')
BEGIN
    CREATE TABLE [Identificador] (
        [Id] int NOT NULL IDENTITY,
        [CodTag] nvarchar(max) NULL,
        CONSTRAINT [PK_Identificador] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604180647_n1')
BEGIN
    CREATE TABLE [Permissao] (
        [Id] int NOT NULL IDENTITY,
        [Adm] bit NOT NULL,
        [Entrada1] nvarchar(max) NULL,
        [Saida1] nvarchar(max) NULL,
        [Entrada2] nvarchar(max) NULL,
        [Saida2] nvarchar(max) NULL,
        CONSTRAINT [PK_Permissao] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604180647_n1')
BEGIN
    CREATE TABLE [Pessoas] (
        [Id] int NOT NULL IDENTITY,
        [Nome] nvarchar(max) NULL,
        [Telefone] nvarchar(max) NULL,
        [Endereco] nvarchar(max) NULL,
        CONSTRAINT [PK_Pessoas] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604180647_n1')
BEGIN
    CREATE TABLE [RegistroHoras] (
        [Id] int NOT NULL IDENTITY,
        [IdColaborador] int NOT NULL,
        [Data] datetime2 NOT NULL,
        CONSTRAINT [PK_RegistroHoras] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604180647_n1')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220604180647_n1', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604181056_n2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220604181056_n2', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604181749_n3')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[AcessoMobile]') AND [c].[name] = N'UserMobile');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [AcessoMobile] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [AcessoMobile] ALTER COLUMN [UserMobile] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604181749_n3')
BEGIN
    DECLARE @var1 sysname;
    SELECT @var1 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'[AcessoMobile]') AND [c].[name] = N'PasswordMobile');
    IF @var1 IS NOT NULL EXEC(N'ALTER TABLE [AcessoMobile] DROP CONSTRAINT [' + @var1 + '];');
    ALTER TABLE [AcessoMobile] ALTER COLUMN [PasswordMobile] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220604181749_n3')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220604181749_n3', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220605044034_n4')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220605044034_n4', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220605165132_n5')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220605165132_n5', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220606214224_n6')
BEGIN
    ALTER TABLE [Permissao] ADD [NomePerfil] nvarchar(max) NULL;
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220606214224_n6')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220606214224_n6', N'5.0.17');
END;
GO

COMMIT;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20220609144416_n7')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20220609144416_n7', N'5.0.17');
END;
GO

COMMIT;
GO

