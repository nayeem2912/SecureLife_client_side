import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageTransactions = () => {
  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/transactions");
      return res.data;
    },
  });

  const { data: income = {} } = useQuery({
    queryKey: ["totalIncome"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/transactions/total-income");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Transactions</h2>

      {/* Total Income Card */}
      <div className="mb-6">
        <div className="bg-green-100 text-green-700 p-4 rounded shadow-md w-64">
          <h3 className="text-lg font-semibold">💰 Total Income</h3>
          <p className="text-2xl font-bold">{income.totalIncome || 0} BDT</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer Email</th>
              <th>Policy Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.transactionId}</td>
                <td>{tx.email}</td>
                <td>{tx.policyName}</td>
                <td>{tx.amount} BDT</td>
                <td>{tx.date}</td>
                <td>
                  <span className="badge badge-success">Success</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTransactions;
