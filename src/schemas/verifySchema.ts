import {z} from 'zod';


export const verifySchema = z.object({
    username:z.string(),
    code:z.string()
        .length(6,"Verification Code should be 6 digits")
    
})