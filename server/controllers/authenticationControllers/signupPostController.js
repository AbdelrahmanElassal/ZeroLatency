import validateCredentials from "../../services/validateCredentials.js"
import { passwordPreProcessing } from "../../services/passwordProcessing.js";

export async function signupPostController(req , res){
    //extract data
    const creds = req.body

    //validate credentials
    validateCredentials(creds)

    //hash password
    const newpass = await passwordPreProcessing(creds.password);

    //post to database
    

    //jwt handling and sending the token back


}