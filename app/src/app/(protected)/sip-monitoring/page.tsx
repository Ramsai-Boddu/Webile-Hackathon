export default function SIPMonitoringPage() {

  const sips = [
    {
      fund: "Axis Bluechip Fund",
      amount: "₹5,000",
      status: "Running",
    },

    {
      fund: "HDFC Flexi Cap",
      amount: "₹10,000",
      status: "Pending",
    },

    {
      fund: "ICICI Technology Fund",
      amount: "₹7,000",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6 text-white">

      <h1 className="text-4xl font-bold mb-8">
        SIP Monitoring
      </h1>

      <div className="space-y-6">

        {sips.map((sip, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
          >

            {/* LEFT */}
            <div>

              <h2 className="text-2xl font-semibold">
                {sip.fund}
              </h2>

              <p className="text-slate-400 mt-2">
                Monthly Investment
              </p>

            </div>

            {/* CENTER */}
            <div>

              <h3 className="text-3xl font-bold text-cyan-400">
                {sip.amount}
              </h3>

            </div>

            {/* RIGHT */}
            <div>

              <span
                className={`px-5 py-2 rounded-xl text-sm font-semibold
                ${
                  sip.status === "Running"
                    ? "bg-green-500/10 text-green-400"
                    : sip.status === "Pending"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-cyan-500/10 text-cyan-400"
                }`}
              >
                {sip.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}