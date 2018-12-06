export class ClientApiSettings {
    private static CURRENT_URL = "http://localhost:50000/api/"
    private static BW_URL = "http://localhost:64112/api/"

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
