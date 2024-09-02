import bcrypt from 'bcrypt';


export async function passwordPreProcessing(password){
    const salt = await bcrypt.genSalt(10);
    newpass = await bcrypt.hash(pass , salt);
    return newpass;
}

export async function comparePassword(password , compared , salt){
    
}
