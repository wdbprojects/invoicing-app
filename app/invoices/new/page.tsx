import CreateInvoice from "@/components/forms/create-invoice";
import { db } from "@/db";
import { sql } from "drizzle-orm";

const NewInvoice = async () => {
  const results = await db.execute(sql`SELECT current_database()`);
  console.log(results);

  return (
    <main className="flex flex-col items-center min-h-screen  max-w-5xl mx-auto p-8">
      <h2 className="text-center text-2xl font-medium">Create new invoice</h2>
      <div className="min-w-[400px] mt-8">
        <CreateInvoice />
      </div>
    </main>
  );
};

export default NewInvoice;
