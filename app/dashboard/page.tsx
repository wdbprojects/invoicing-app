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

import { invoices } from "@/lib/data";
import Link from "next/link";

const Dashboard = () => {
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
            <TableHead className="w-[150px] p-4">Date</TableHead>
            <TableHead className="p-4">Customer</TableHead>
            <TableHead className="p-4">Email</TableHead>
            <TableHead className="text-center p-4">Status</TableHead>
            <TableHead className="text-right p-4">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map((item) => {
            const { id, date, customer, email, status, value } = item;
            return (
              <TableRow key={id}>
                <TableCell className="text-left font-semibold p-4">
                  <span>{date}</span>
                </TableCell>
                <TableCell className="text-left p-4">
                  <span className="font-semibold">{customer}</span>
                </TableCell>
                <TableCell className="text-left text-muted-foreground p-4">
                  <span>{email}</span>
                </TableCell>
                <TableCell className="text-center p-4">
                  <Badge variant="default" className="rounded-full">
                    {status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right p-4">
                  <span>{value}</span>
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
