import validateCredentials from "../../services/validateCredentials.js"
import { comparePassword, passwordPreProcessing } from "../../services/passwordProcessing.js";
import { addStreamer , findUserbyEmail} from "../../prisma/scripts.js";
import { doToken } from "../../services/jwtServices.js";


export async function signupPostController(req , res , next){

    try{
        //extract data
        const creds = req.body


        //validate credentials
        validateCredentials(creds)

        //hash password
        const [newpass , salt] = await passwordPreProcessing(creds.password);

        //post to database
        const streamer = await addStreamer({
            ...creds,
            password: newpass,
            salt: salt
        });

        //jwt handling and sending the token back
        const token = doToken(streamer.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({ streamer: streamer.id });
    }catch(error){
        next(error);
    }
}


export async function loginPostController (req , res , next){
    try{
        const creds = req.body

        const streamer = await findUserbyEmail(creds.email);
        if(!streamer){
            throw "Account was not found";
        }

        let flag = await comparePassword(creds.password , streamer.salt , streamer.password)
        if(!flag){
            throw "Worng password";
        }


        const token = doToken(streamer.id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({ streamer: streamer.id });

    }catch(error){
        next(error)
    }
}