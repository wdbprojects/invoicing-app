import { z } from "zod";

export const createInvoiceSchema = z.object({
  billingName: z.string().min(1, { message: "Required field" }),
  billingEmail: z.string().min(1, { message: "Required field" }).email({
    message: "Must be a valid email",
  }),
  value: z.number().gt(0, { message: "Value must be greater than 0" }),
  description: z.string().min(1, { message: "Required field" }),
});

export type CreateInvoiceType = z.infer<typeof createInvoiceSchema>;

export const invoiceSchema = z.object({
  billingName: z.string().min(1, { message: "Full name is a required field" }),
  billingEmail: z.string().email({
    message: "Must be a valid email",
  }),
  value: z
    .string({ message: "Amount must be a greater than 0" })
    .transform((val) => {
      const parsed = Number(val);
      if (isNaN(parsed)) {
        throw new Error("Invalid value");
      }
      return parsed;
    })
    .pipe(z.number().gt(0, { message: "Amount must be greater than 0" })),
  description: z.string().trim(),
});
