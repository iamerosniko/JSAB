export class ClientApiSettings {
    //if NOT using ng serve
    private static CURRENT_URL = "api/"
    //if using NG Serve
    // private static CURRENT_URL = "https://abadiversityclientlocal.azurewebsites.net/api/"
    // private static BW_URL = "http://localhost:64112/api/"
    private static BW_URL ="https://abadiversityapilocal.azurewebsites.net/api/"

    public static GETBWURL(controller:string):string{
        var path="";
        if(location.host.includes("localhost")){
            path= "https://abadiversityapilocal.azurewebsites.net/api/"+controller;
        }
        else if(location.host.includes("dev")){
            path= "https://abadiversityapilocal.azurewebsites.net/api/"+controller;
        }
        else if(location.host.includes("stest")){
            path= "https://ABASURVEYAPISTEST.azurewebsites.net/api/"+controller;
        }
        else if(location.host.includes("stage")){
            path= "https://ABASURVEYAPISTAGE.azurewebsites.net/api/"+controller;
        }
        else {
            path= "https://ABASURVEYAPI.azurewebsites.net/api/"+controller;
        }
        console.log("BW"+path)
        return path;
    }

    public static GETCLIENTAPIURL(controller:string):string{
        console.log(location.host)
        var path="";
        if(location.host.includes("localhost")){
            path= "https://localhost:44323/api/"+controller;
            // path= "https://abadiversityclientlocal.azurewebsites.net/api/"+controller;
        }
        else if(location.host.includes("dev")){
            path= "https://abasurveydev.azurewebsites.net/api/"+controller;
        }
        else if(location.host.includes("stest")){
            path= "https://ABASURVEYSTEST.azurewebsites.net/api/"+controller;
        }
        else if(location.host.includes("stage")){
            path= "https://ABASURVEYSTAGE.azurewebsites.net/api/"+controller;
        }
        else {
            path= "https://ABASURVEY.azurewebsites.net/api/"+controller;
        }
        console.log("CW:"+path);
        return path;
    }

    public static HANDLEERROR(error : any):Promise<any>{
        console.error('An error occured',error);
        return Promise.reject(error.message || error);
    }
}
