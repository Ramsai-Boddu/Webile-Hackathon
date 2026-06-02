export default function RecentTransactions() {

  const transactions = [
    {
      name: "Bought TCS",
      amount: "₹35,000",
    },
    {
      name: "Bought INFY",
      amount: "₹20,000",
    },
    {
      name: "SIP Investment",
      amount: "₹5,000",
    },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Transactions
      </h2>

      <div className="space-y-4">

        {transactions.map((item, index) => (

          <div
            key={index}
            className="flex justify-between bg-[#0f1c2e] p-4 rounded-xl"
          >

            <span>{item.name}</span>

            <span>{item.amount}</span>

          </div>

        ))}

      </div>

    </div>
  );
}