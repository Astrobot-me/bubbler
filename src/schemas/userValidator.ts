import {z} from 'zod';


const validateUsername = z.string()
    .min(3,{message:"username must be 3 chars or long"})
    .max(10,{message:"username atmost should be 20 chars long"})
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');



export const userValidator = z.object({
    username:validateUsername,
    email:z.string().email({message:"Invalid Email Address"}),
    password:z.string()
    .min(6, { message: 'Password must be at least 6 characters' }),
    
})

