export interface AppSignIn {
    AppURL:string,
    UserName:string
}
export interface UserAppRole{
    UserID?:number,
    AuthenticationToken?:string,
    AuthorizationToken?:string,
    UserName?:string,
    FirstName?:string,
    LastName?:string,
    Role?:string,
}

export interface BtamEntity{
    BTAMURL:string
}

export interface AppToken{
    TokenName: string,
    Token : string
}
// "AppToken
//         public String TokenName { get; set; }
//         public String Token { get; set; }"
