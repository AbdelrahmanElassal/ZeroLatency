import { PrismaClient , Prisma } from "@prisma/client";
const prismaclient = new PrismaClient()

//to handle errors in prisma you have to check if this is any type of errors in from the types of prisma errors
// as 
// Prisma.PrismaClientInitializationError
// Prisma.PrismaClientKnownRequestError
// and so on

export async function addStreamer({email , firstname , lastname , username , password , salt} , next){
    try{
        const streamer = await prismaclient.streamer.create({
            data:{
                email: email,
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
                salt: salt
            }
        }) 

        return streamer;
    }catch(error){
        throw(error)
    }

}