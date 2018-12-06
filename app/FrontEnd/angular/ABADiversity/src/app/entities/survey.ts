import {Certificates,CompanyProfiles,FirmDemographics,
    Firms,JoinedLawyers,LeadershipDemographics,
    LeftLawyers,PromotionsAssociatePartners,ReducedHoursLawyers,
    TopTenHighestCompensations,UndertakenInitiatives} from './entities'
    
export interface Survey{
    Firm?:Firms;
    Companyprofile?:CompanyProfiles;
    UndertakenInitiatives ?: UndertakenInitiatives;
    FirmDemographics ?: FirmDemographics[],
    JoinedLawyers ?: JoinedLawyers[],
    LeadershipDemographics ?: LeadershipDemographics[];
    LeftLawyers ?: LeftLawyers[];
    PromotionsAssociatePartners ?: PromotionsAssociatePartners[];
    ReducedhoursLawyers ?: ReducedHoursLawyers[];
    Certificates ?: Certificates[];
    TopTenHighestCompensations ?: TopTenHighestCompensations[];
    IsNewFirm?:boolean;
}
export interface Survey2{
    firm?:Firms;
    companyProfile?:CompanyProfiles;
    undertakenInitiatives ?: UndertakenInitiatives;
    firmDemographics ?: FirmDemographics[],
    joinedLawyers ?: JoinedLawyers[],
    leadershipDemographics ?: LeadershipDemographics[];
    leftLawyers ?: LeftLawyers[];
    promotionsAssociatePartners ?: PromotionsAssociatePartners[];
    reducedhoursLawyers ?: ReducedHoursLawyers[];
    certificates ?: Certificates[];
    topTenHighestCompensations ?: TopTenHighestCompensations[];
    isNewFirm?:boolean;
}