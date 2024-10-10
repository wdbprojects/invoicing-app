"use server";

import { invoiceSchema } from "@/lib/zod-schemas";
import { z } from "zod";
/* DATABASE IMPORTS */
import { Invoices } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";

type InvoiceSchemaType = z.infer<typeof invoiceSchema>;
export type FormState = {
  message: string;
  invoice?: InvoiceSchemaType;
  issues?: string[];
};

export const createInvoiceAction = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const data = Object.fromEntries(formData);
  const parsed = await invoiceSchema.safeParseAsync(data);

  if (parsed.success) {
    const formattedValue = Math.floor(
      parseFloat(String(parsed.data.value)) * 100,
    );
    const invoice = {
      value: formattedValue,
      description: parsed.data.description,
    };
    const results = await db
      .insert(Invoices)
      .values({
        value: invoice.value,
        description: invoice.description,
        status: "open",
      })
      .returning({ id: Invoices.id });
    redirect(`/invoices/${results[0].id}`);

    return { message: "Invoice created by SAFD" };
  } else {
    return {
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => {
        return issue.message;
      }),
    };
  }
};
