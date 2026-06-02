"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface SIP {
  id: number;
  customer_ref: string;
  scheme_code: string;
  sip_amount: number;
  sip_status: string;
  start_date: string;
  next_due_date: string;
}

export default function SIPMonitoringPage() {

  const [sips, setSips] = useState<SIP[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSips = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "http://localhost:4000/admin/sips",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setSips(
        response.data.sips || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchSips();

  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          SIP Monitoring
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor all active SIPs
        </p>

      </div>

      {loading ? (

        <div>
          Loading SIPs...
        </div>

      ) : (

        <div className="overflow-x-auto rounded-2xl border border-slate-800">

          <table className="w-full">

            <thead className="bg-slate-900">

              <tr>

                <th className="p-4 text-left">
                  Customer Ref
                </th>

                <th className="p-4 text-left">
                  Scheme Code
                </th>

                <th className="p-4 text-left">
                  SIP Amount
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Start Date
                </th>

                <th className="p-4 text-left">
                  Next Due Date
                </th>

              </tr>

            </thead>

            <tbody>

              {sips.map((sip) => (

                <tr
                  key={sip.id}
                  className="border-t border-slate-800"
                >

                  <td className="p-4">
                    {sip.customer_ref}
                  </td>

                  <td className="p-4">
                    {sip.scheme_code}
                  </td>

                  <td className="p-4">
                    ₹{sip.sip_amount}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        sip.sip_status === "ACTIVE"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {sip.sip_status}
                    </span>

                  </td>

                  <td className="p-4">
                    {new Date(
                      sip.start_date
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {new Date(
                      sip.next_due_date
                    ).toLocaleDateString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}