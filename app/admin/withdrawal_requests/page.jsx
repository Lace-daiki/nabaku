'use client';

import WithdrawalRequestTable from "@/components/admin/withdrawal_req/with_table";



export default function TransactionsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-6">
        <WithdrawalRequestTable />
      </div>
    </div>
  );
}
