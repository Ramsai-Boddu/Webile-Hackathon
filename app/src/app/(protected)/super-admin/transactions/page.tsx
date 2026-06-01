"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface StockTransaction {
  investor_id: string;
  stock_symbol: string;
  transaction_type: string;
  quantity: number;
  price: number;
  executed_at: string;
}

interface MFTransaction {
  customer_ref: string;
  scheme_code: string;
  transaction_type: string;
  amount: number;
  units: number;
  created_at: string;
}

export default function TransactionsPage() {

  const [stockTransactions, setStockTransactions] =
    useState<StockTransaction[]>([]);

  const [mfTransactions, setMfTransactions] =
    useState<MFTransaction[]>([]);

  const [loading, setLoading] =
    useState(true);

  const fetchTransactions = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "http://localhost:4000/admin/transactions",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setStockTransactions(
        response.data.stockTransactions || []
      );

      setMfTransactions(
        response.data.mfTransactions || []
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchTransactions();

  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-slate-950 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Portfolio Transactions
      </h1>

      {/* EQUITY TRANSACTIONS */}

      <div className="mb-12">

        <h2 className="text-2xl font-semibold mb-4">
          Equity Transactions
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">

          <table className="w-full">

            <thead className="bg-slate-900">

              <tr>
                <th className="p-4 text-left">
                  Investor
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Date
                </th>
              </tr>

            </thead>

            <tbody>

              {stockTransactions.map(
                (transaction, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-800"
                  >

                    <td className="p-4">
                      {transaction.investor_id}
                    </td>

                    <td className="p-4">
                      {transaction.stock_symbol}
                    </td>

                    <td className="p-4">
                      {transaction.transaction_type}
                    </td>

                    <td className="p-4">
                      {transaction.quantity}
                    </td>

                    <td className="p-4">
                      ₹{transaction.price}
                    </td>

                    <td className="p-4">
                      {new Date(
                        transaction.executed_at
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* MF TRANSACTIONS */}

      <div>

        <h2 className="text-2xl font-semibold mb-4">
          Mutual Fund Transactions
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-slate-800">

          <table className="w-full">

            <thead className="bg-slate-900">

              <tr>
                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Scheme
                </th>

                <th className="p-4 text-left">
                  Type
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Units
                </th>

                <th className="p-4 text-left">
                  Date
                </th>
              </tr>

            </thead>

            <tbody>

              {mfTransactions.map(
                (transaction, index) => (
                  <tr
                    key={index}
                    className="border-t border-slate-800"
                  >

                    <td className="p-4">
                      {transaction.customer_ref}
                    </td>

                    <td className="p-4">
                      {transaction.scheme_code}
                    </td>

                    <td className="p-4">
                      {transaction.transaction_type}
                    </td>

                    <td className="p-4">
                      ₹{transaction.amount}
                    </td>

                    <td className="p-4">
                      {transaction.units}
                    </td>

                    <td className="p-4">
                      {new Date(
                        transaction.created_at
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}