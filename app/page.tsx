import Link from "next/link";
import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen text-center max-w-5xl mx-auto space-y-8 ">
      <h1 className="text-5xl font-bold">Invoicipedia</h1>
      <Button asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <DarkMode />
    </main>
  );
}
