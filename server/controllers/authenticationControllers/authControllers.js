import validateCredentials from "../../services/validateCredentials.js"
import { passwordPreProcessing } from "../../services/passwordProcessing.js";
import { addStreamer } from "../../prisma/scripts.js";
import { doToken } from "../../services/jwtServices.js";


export async function signupPostController(req , res , next){

    try{
        //extract data
        let creds = req.body


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