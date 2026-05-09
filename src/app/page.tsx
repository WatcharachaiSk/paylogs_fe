import AddLogs from "@/components/home/AddLogs";
import TableComponent from "@/components/home/TableLogs";

export default function HomePage() {
  return (
    <div className="space-y-4">
      <AddLogs />
      <TableComponent />
    </div>
  );
}
