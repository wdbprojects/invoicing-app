import CreateInvoice from "@/components/forms/create-invoice";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { createInvoiceSchema, type CreateInvoiceType } from "@/lib/zod-schemas";

const NewInvoice = async () => {
  const createInvoiceAction = async (
    prevState: {
      message: string;
      invoice?: CreateInvoiceType;
      issues?: string[];
    },
    formData: FormData,
  ) => {
    "use server";
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

  return (
    <main className="flex flex-col items-center min-h-screen  max-w-5xl mx-auto p-8">
      <h2 className="text-center text-2xl font-medium">Create new invoice</h2>
      <div className="min-w-[400px] mt-8">
        <CreateInvoice createInvoiceAction={createInvoiceAction} />
      </div>
    </main>
  );
};

export default NewInvoice;
