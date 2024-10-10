import Link from "next/link";
import { Button } from "@/components/ui/button";

const InvoiceDetails = () => {
  return (
    <div>
      <h2>Invoice Details</h2>
      <Button asChild>
        <Link href="/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  );
};

export default InvoiceDetails;
