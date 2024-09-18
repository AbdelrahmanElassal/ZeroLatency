import  Jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function doToken(id){
    return Jwt.sign({id} , process.env.STRING , {
      expiresIn: 24 * 60 * 60 * 1000
    })
}

