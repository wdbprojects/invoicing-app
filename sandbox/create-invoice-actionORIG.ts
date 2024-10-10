"use server";

import { Invoices } from "@/db/schema";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { createInvoiceSchema, type CreateInvoiceType } from "@/lib/zod-schemas";

export const createInvoiceAction = async (
  prevState: {
    message: string;
    invoice?: CreateInvoiceType;
    issues?: string[];
  },
  formData: FormData,
) => {
  const value = Math.floor(parseFloat(String(formData.get("value"))) * 100);
  const description = formData.get("description") as string;

  const data = { value: value, description: description, status: "open" };
  const parsed = await createInvoiceSchema.safeParseAsync(data);

  if (parsed.success) {
    console.log("Invoice created by SAFD");
    const invoice = parsed.data;

    // const results = await db
    //   .insert(Invoices)
    //   .values(invoice)
    //   .returning({ id: Invoices.id });

    // redirect(`/invoices/${results[0].id}`);

    return { message: "Invoice created by SAFD", invoice: invoice };
  } else {
    return {
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => {
        return issue.message;
      }),
    };
  }
};
