import {z} from "zod";

export const formSchema = z.object({
    title :z.string().min(3).max(100),
    description :z.string().min(5).max(500),
    category :z.string().min(3).max(20),
      vercelLink: z
    .string()
    .url("Invalid Vercel URL")
    .optional()
    .or(z.literal("")),
    image: z.instanceof(File),
    details : z.string().min(10),
  

})