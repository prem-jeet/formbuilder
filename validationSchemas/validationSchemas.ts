import { z } from "zod";

export const EnumFormSchema = z.object({
  name: z.string().min(1).max(255),
  label: z.string().min(1).max(255),
  options: z.string().array().nonempty(),
});
