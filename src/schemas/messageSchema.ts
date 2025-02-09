import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(1, "Message must be atleast 1 character")
    .max(300, "Message must be no more than 300 characters"),
});
