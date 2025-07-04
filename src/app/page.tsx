// "use client";

import AddLogs from "@/components/home/AddLogs";
import TableComponent from "@/components/home/TableLogs";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4">🏡 Your Logs</h1>
      <AddLogs />
      <TableComponent />
    </div>
  );
}
