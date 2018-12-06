IF OBJECT_ID(N'__EFMigrationsHistory') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_Certificates] (
        [CertificateID] uniqueidentifier NOT NULL,
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [DateCert] datetime2 NOT NULL,
        [Name] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_Certificates] PRIMARY KEY ([CertificateID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_CompanyProfiles] (
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [Catown] nvarchar(max) NULL,
        [Datecomp] datetime2 NOT NULL,
        [FirmID] uniqueidentifier NOT NULL,
        [Firmcert] nvarchar(max) NULL,
        [Firmhead] nvarchar(max) NULL,
        [Firmname] nvarchar(max) NULL,
        [Firmown] nvarchar(max) NULL,
        [Sizecat] int NOT NULL,
        [Srcemail] nvarchar(max) NULL,
        [Srcname] nvarchar(max) NULL,
        [Srctitle] nvarchar(max) NULL,
        [Totalfw] int NOT NULL,
        [Totalusfw] int NOT NULL,
        CONSTRAINT [PK_AD_CompanyProfiles] PRIMARY KEY ([CompanyProfileID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_FirmDemographics] (
        [FirmDemographicID] uniqueidentifier NOT NULL,
        [Associates] nvarchar(max) NULL,
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [Counsel] nvarchar(max) NULL,
        [EquityPartners] nvarchar(max) NULL,
        [NonEquityPartners] nvarchar(max) NULL,
        [OtherLawyers] nvarchar(max) NULL,
        [RegionName] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_FirmDemographics] PRIMARY KEY ([FirmDemographicID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_Firms] (
        [FirmID] uniqueidentifier NOT NULL,
        [FirmName] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_Firms] PRIMARY KEY ([FirmID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_JoinedLawyers] (
        [JoinedLawyerID] uniqueidentifier NOT NULL,
        [Associates] nvarchar(max) NULL,
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [Counsel] nvarchar(max) NULL,
        [EquityPartners] nvarchar(max) NULL,
        [NonEquityPartners] nvarchar(max) NULL,
        [OtherLawyers] nvarchar(max) NULL,
        [RegionName] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_JoinedLawyers] PRIMARY KEY ([JoinedLawyerID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_LeadershipDemographics] (
        [LeadershipDemographicID] uniqueidentifier NOT NULL,
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [Disabled] nvarchar(max) NULL,
        [LGBT] nvarchar(max) NULL,
        [MinorityFemale] nvarchar(max) NULL,
        [MinorityMale] nvarchar(max) NULL,
        [NumberQuestion] nvarchar(max) NULL,
        [WhiteFemale] nvarchar(max) NULL,
        [WhiteMale] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_LeadershipDemographics] PRIMARY KEY ([LeadershipDemographicID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_LeftLawyers] (
        [LeftLawyerID] uniqueidentifier NOT NULL,
        [Associates] nvarchar(max) NULL,
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [Counsel] nvarchar(max) NULL,
        [EquityPartners] nvarchar(max) NULL,
        [NonEquityPartners] nvarchar(max) NULL,
        [OtherLawyers] nvarchar(max) NULL,
        [RegionName] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_LeftLawyers] PRIMARY KEY ([LeftLawyerID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_PromotionsAssociatePartners] (
        [PromotionsAssociatePartnerID] uniqueidentifier NOT NULL,
        [Associates] nvarchar(max) NULL,
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [Counsel] nvarchar(max) NULL,
        [EquityPartners] nvarchar(max) NULL,
        [NonEquityPartners] nvarchar(max) NULL,
        [OtherLawyers] nvarchar(max) NULL,
        [RegionName] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_PromotionsAssociatePartners] PRIMARY KEY ([PromotionsAssociatePartnerID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_ReducedHoursLawyers] (
        [ReducedHoursLawyerID] uniqueidentifier NOT NULL,
        [Associates] nvarchar(max) NULL,
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [Counsel] nvarchar(max) NULL,
        [EquityPartners] nvarchar(max) NULL,
        [NonEquityPartners] nvarchar(max) NULL,
        [OtherLawyers] nvarchar(max) NULL,
        [RegionName] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_ReducedHoursLawyers] PRIMARY KEY ([ReducedHoursLawyerID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_TopTenHighestCompensations] (
        [TopTenHighestCompensationID] uniqueidentifier NOT NULL,
        [Associates] nvarchar(max) NULL,
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [Counsel] nvarchar(max) NULL,
        [EquityPartners] nvarchar(max) NULL,
        [NonEquityPartners] nvarchar(max) NULL,
        [OtherLawyers] nvarchar(max) NULL,
        [RegionName] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_TopTenHighestCompensations] PRIMARY KEY ([TopTenHighestCompensationID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    CREATE TABLE [AD_UntertakenInitiatives] (
        [UndertakenInitiativeID] uniqueidentifier NOT NULL,
        [Answer1] nvarchar(max) NULL,
        [Answer10] nvarchar(max) NULL,
        [Answer11] nvarchar(max) NULL,
        [Answer12] nvarchar(max) NULL,
        [Answer13] nvarchar(max) NULL,
        [Answer14] nvarchar(max) NULL,
        [Answer15] nvarchar(max) NULL,
        [Answer16] nvarchar(max) NULL,
        [Answer17] nvarchar(max) NULL,
        [Answer2] nvarchar(max) NULL,
        [Answer3] nvarchar(max) NULL,
        [Answer4] nvarchar(max) NULL,
        [Answer5] nvarchar(max) NULL,
        [Answer6] nvarchar(max) NULL,
        [Answer7] nvarchar(max) NULL,
        [Answer8] nvarchar(max) NULL,
        [Answer9] nvarchar(max) NULL,
        [Comment1] nvarchar(max) NULL,
        [Comment10] nvarchar(max) NULL,
        [Comment11] nvarchar(max) NULL,
        [Comment12] nvarchar(max) NULL,
        [Comment13] nvarchar(max) NULL,
        [Comment14] nvarchar(max) NULL,
        [Comment15] nvarchar(max) NULL,
        [Comment16] nvarchar(max) NULL,
        [Comment17] nvarchar(max) NULL,
        [Comment2] nvarchar(max) NULL,
        [Comment3] nvarchar(max) NULL,
        [Comment4] nvarchar(max) NULL,
        [Comment5] nvarchar(max) NULL,
        [Comment6] nvarchar(max) NULL,
        [Comment7] nvarchar(max) NULL,
        [Comment8] nvarchar(max) NULL,
        [Comment9] nvarchar(max) NULL,
        [CompanyProfileID] uniqueidentifier NOT NULL,
        [MainComment] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_UntertakenInitiatives] PRIMARY KEY ([UndertakenInitiativeID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180727213826_init')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20180727213826_init', N'2.0.1-rtm-125');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180801134051_m001')
BEGIN
    DECLARE @var0 sysname;
    SELECT @var0 = [d].[name]
    FROM [sys].[default_constraints] [d]
    INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
    WHERE ([d].[parent_object_id] = OBJECT_ID(N'AD_CompanyProfiles') AND [c].[name] = N'Sizecat');
    IF @var0 IS NOT NULL EXEC(N'ALTER TABLE [AD_CompanyProfiles] DROP CONSTRAINT [' + @var0 + '];');
    ALTER TABLE [AD_CompanyProfiles] ALTER COLUMN [Sizecat] nvarchar(max) NULL;
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20180801134051_m001')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20180801134051_m001', N'2.0.1-rtm-125');
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20181011123806_m002')
BEGIN
    CREATE TABLE [AD_Audit] (
        [AuditID] uniqueidentifier NOT NULL,
        [Action] nvarchar(max) NULL,
        [DateModified] datetime2 NOT NULL,
        [Module] nvarchar(max) NULL,
        [Username] nvarchar(max) NULL,
        CONSTRAINT [PK_AD_Audit] PRIMARY KEY ([AuditID])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20181011123806_m002')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20181011123806_m002', N'2.0.1-rtm-125');
END;

GO

