import Link from "next/link";
import { db } from "@/db";
import { Invoices } from "@/db/schema";

import DarkMode from "@/components/shared/dark-mode";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CirclePlus } from "lucide-react";

const Dashboard = async () => {
  const realInvoices = await db.select().from(Invoices);

  return (
    <main className="flex flex-col items-center min-h-screen text-center max-w-5xl mx-auto space-y-8 p-8">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-semibold text-left">Dashboard</h1>
        <Button variant="ghost" asChild className="inline-flex gap-2">
          <Link href="/invoices/new">
            <CirclePlus className="h-4 w-4" />
            <span>Create invoice</span>
          </Link>
        </Button>
      </div>

      <Table>
        <TableCaption>A list of your recent invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {realInvoices?.map((item) => {
            const { id, createTs, description, status, value } = item;
            return (
              <TableRow key={id} className="">
                <TableCell className="text-left font-semibold p-0">
                  <Link href={`/invoices/${id}`} className="p-4 block">
                    {createTs.toDateString()}
                  </Link>
                </TableCell>
                <TableCell className="text-left p-0">
                  <Link
                    href={`/invoices/${id}`}
                    className="font-semibold p-4 block"
                  >
                    Emily Blunt
                  </Link>
                </TableCell>
                <TableCell className="text-left text-muted-foreground p-0">
                  <Link href={`/invoices/${id}`} className="p-4 block">
                    emily@bluntprod.com
                  </Link>
                </TableCell>
                <TableCell className="text-center p-0">
                  <Link href={`/invoices/${id}`} className="p-4 block">
                    <Badge variant="default" className="rounded-full">
                      {status}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-0">
                  <Link href={`/invoices/${id}`} className="p-4 block">
                    $ {(value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <DarkMode />
    </main>
  );
};

export default Dashboard;
