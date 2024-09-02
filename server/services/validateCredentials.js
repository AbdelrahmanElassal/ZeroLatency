import  streamerSchema  from "../config/streamerSchema.js";

//zod when error happens return an object with string called message --> error.message
//the message is a string needed to be parsed into json --> JSON.parse(error.message)
//it returns an array of objects each object represents an error in one input eg:username , password etc
//you sould map the array to ectract the fields that contains errors and each of them has a message that you customized in the schema
//JSON.parse(error.message)[0].message <---------------- FOR EXAMPLE
//(error instanceof z.ZodError) to check if it is a zod error
function validateCredentials(creds){
    try{
        const fl = streamerSchema.parse(creds);
    }catch(error){
        throw(error) //error handled in the global handler
    }
}


export default validateCredentials;