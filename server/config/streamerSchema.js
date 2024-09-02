import {z} from 'zod';

const streamerSchema = z.object({
    email: z.string().email("Write a Valid email please"),
    firstname: z.string().min(2 , "At least 2 characters").max(50 , "at most 50 characters"),
    lastname: z.string().min(2 , "At least 2 characters").max(50 , "at most 50 characters"),
    username: z.string().min(5 , "At least 5 characters").max(50 , "at most 50 characters"),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must contain at least one special character." })

});



export default streamerSchema;