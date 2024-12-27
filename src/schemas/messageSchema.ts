import {z} from 'zod'

export const messageSchema = z.object({
    content: z.string()
    .min(10,{message:"Message must be 10 characters long"})
    .max(100,{message:"Message must not exceed 300 characters"})
})