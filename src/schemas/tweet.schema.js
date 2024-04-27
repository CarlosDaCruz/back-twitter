import { date, z } from "zod";

export const createTweetSchema = z.object({
  theme: z.string({
    required_error: "Theme is required",
  }),
  date: z.string().datetime().optional(),
});
