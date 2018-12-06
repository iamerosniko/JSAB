export class ClientApiSettings {
    private static CURRENT_URL = "api/"
    // private static CURRENT_URL = "https://abadiversityclientlocal.azurewebsites.net/api/"
    // private static BW_URL = "http://localhost:64112/api/"
    private static BW_URL ="https://abadiversityapilocal.azurewebsites.net/api/"

    public static GETBWURL(controller:string):string{
        return this.BW_URL+controller;
    }

    public static GETCLIENTAPIURL(controller:string):string{
        return this.CURRENT_URL+controller;
    }

    public static HANDLEERROR(error : any):Promise<any>{
        console.error('An error occured',error);
        return Promise.reject(error.message || error);
    }
}
