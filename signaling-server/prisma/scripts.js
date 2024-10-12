import { PrismaClient , Prisma } from "@prisma/client";
const prismaclient = new PrismaClient()

//to handle errors in prisma you have to check if this is any type of errors in from the types of prisma errors
// as 
// Prisma.PrismaClientInitializationError
// Prisma.PrismaClientKnownRequestError
// and so on

export async function addStreamer({email , firstname , lastname , username , password , salt} , next){
    let streamer;
    try{
        streamer = await prismaclient.streamer.create({
            data:{
                email: email,
                firstname: firstname,
                lastname: lastname,
                username: username,
                password: password,
                salt: salt
            }
        }) 

        
    }catch(error){
        throw(error)
    }
    
    return streamer;
}

export async function findUserbyEmail(em){
    let streamer;

    try{
        streamer = await prismaclient.streamer.findUnique({
        where: {
            email: em,
        },
        })
    }catch(error){
        throw(error);
    }
    return streamer;
}

export async function findUserbyId(id){
    let streamer;

    try{
        streamer = await prismaclient.streamer.findUnique({
        where: {
            id: id,
        },
        })
    }catch(error){
        throw(error);
    }
    return streamer;
}



export async function addStream(title , description , streamerId){
    let stream;
    try{
        stream = await prismaclient.stream.create({
            data:{
                title: "Stream Title",
                description: "Stream Description",
                //add more fields if needed
            }
        }) 

        
    }catch(error){
        throw(error)
    }
    
    return stream;
}