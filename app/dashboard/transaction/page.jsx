import TransactionsTable from "@/components/transactions";


export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        <TransactionsTable />
      </div>
    </div>
  );
}
