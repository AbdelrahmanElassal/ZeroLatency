import bcrypt from 'bcrypt';


export async function passwordPreProcessing(password){
    const salt = await bcrypt.genSalt(10);
    const newpass = await bcrypt.hash(password , salt);
    return [newpass , salt];
}

export async function comparePassword(password , compared , salt){
    
}
