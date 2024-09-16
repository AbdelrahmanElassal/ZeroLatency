import {z} from 'zod';
import { Prisma } from '@prisma/client';

export function globalErrorHandler(error , req , res , next){
    
    if ((error instanceof z.ZodError)){
        const zodErrors = JSON.parse(error.message).map((el)=>{
            return { field: el.path[0], message: el.message }
        });
        //res.status(400).json({ errors: zodErrors });
        res.status(400).json({errors: "password needs to be 8 characters or more \n it should include capital letters and special characters \n"});
    }

    if (error.code !== undefined ){
        res.status(400).json({errors: error.message})
    }

    next();
}