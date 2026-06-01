"use client";

import {useEffect,useState,} from "react";

import axios from "axios";

import {ResponsiveContainer,LineChart,Line, XAxis,YAxis,CartesianGrid,Tooltip,} from "recharts";

interface Fund {
  scheme_code: string;
  scheme_name: string;
  amc_name: string;
  fund_category: string;
  risk_category: string;
  nav_value: string;
  nav_date: string;
}

interface NavHistory {
  nav_value: string;
  nav_date: string;
}

export default function MutualFundsPage() {

  const [funds, setFunds] =
    useState<Fund[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedFund, setSelectedFund] =
    useState<Fund | null>(null);

  const [showModal, setShowModal] =
    useState(false);

  const [sipAmount, setSipAmount] =
    useState("");

  const [sipLoading, setSipLoading] =
    useState(false);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [navHistory, setNavHistory] =
    useState<NavHistory[]>([]);

  const [updatedNav, setUpdatedNav] =
    useState<number | null>(null);

  // FETCH ALL FUNDS
  useEffect(() => {

    const fetchFunds =
      async () => {

        try {

          const token =
            localStorage.getItem("token");

          const response =
            await axios.get(
              "http://localhost:4000/bs/market/funds",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          console.log(
            "FUNDS API:",
            response.data
          );

          setFunds(
            response.data.funds || []
          );

        } catch (err: unknown) {
          console.log(err);

          if (axios.isAxiosError(err)) {
            setError(err.response?.data?.message || "Failed to fetch funds");
          } else {
            setError("Failed to fetch funds");
          }

        } finally {

          setLoading(false);

        }
      };

    fetchFunds();

  }, []);

  // FETCH NAV HISTORY
  const fetchFundDetails =
    async (
      schemeCode: string,
      fund: Fund
    ) => {

      try {

        setDetailsLoading(true);

        setShowModal(true);

        setSelectedFund(fund);

        setUpdatedNav(null);

        const token =
          localStorage.getItem("token");

        const navResponse =
          await axios.get(
            `http://localhost:4000/hist/nav-history/${schemeCode}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        console.log(
          "FULL NAV RESPONSE:",
          navResponse.data
        );

        let historyData: NavHistory[] = [];

        if (
          Array.isArray(
            navResponse.data.data
          )
        ) {

          historyData =
            navResponse.data.data;
        }

        else if (
          Array.isArray(
            navResponse.data.data?.history
          )
        ) {

          historyData =
            navResponse.data.data.history;
        }

        else if (
          Array.isArray(
            navResponse.data.history
          )
        ) {

          historyData =
            navResponse.data.history;
        }

        else if (
          Array.isArray(
            navResponse.data
          )
        ) {

          historyData =
            navResponse.data;
        }

        setNavHistory(historyData);

      } catch (error) {

        console.log(error);

        setNavHistory([]);

      } finally {

        setDetailsLoading(false);

      }
    };

  // GRAPH DATA
  const chartData =
    navHistory.map(
      (item) => ({

        date:
          item.nav_date
            ? new Date(
                item.nav_date
              ).toLocaleDateString()
            : "N/A",

        nav:
          item.nav_value
            ? parseFloat(
                item.nav_value
              )
            : 0,
      })
    );

  // START SIP
  const handleStartSIP =
    async () => {

      try {

        setSipLoading(true);

        if (!selectedFund) return;

        const currentNav =
          parseFloat(
            selectedFund.nav_value
          );

        const amount =
          Number(sipAmount);

        const increasedNav =
          currentNav +
          amount / 1000;

        setUpdatedNav(
          increasedNav
        );

        // UPDATE MODAL
        setSelectedFund({
          ...selectedFund,
          nav_value:
            increasedNav.toFixed(4),
        });

        // UPDATE CARD
        setFunds((prevFunds) =>
          prevFunds.map((fund) => {

            if (
              fund.scheme_code ===
              selectedFund.scheme_code
            ) {

              return {
                ...fund,
                nav_value:
                  increasedNav.toFixed(4),
              };
            }

            return fund;
          })
        );

        // UPDATE GRAPH
        const today =
          new Date().toISOString();

        const newNavPoint = {
          nav_value:
            increasedNav.toFixed(4),

          nav_date: today,
        };

        setNavHistory((prev) => [
          ...prev,
          newNavPoint,
        ]);

        alert(
          `SIP Started Successfully\n\nFund: ${selectedFund.scheme_name}\nAmount: ₹${sipAmount}`
        );

        setSipAmount("");

      } catch (error) {

        console.log(error);

      } finally {

        setSipLoading(false);

      }
    };

  // LOADING
  if (loading) {

    return (
      <div className="text-white p-6">
        Loading mutual funds...
      </div>
    );
  }

  // ERROR
  if (error) {

    return (
      <div className="text-red-400 p-6">
        {error}
      </div>
    );
  }

  return (
    <div className="text-white p-6 min-h-screen bg-[#07111f]">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Mutual Funds
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Explore and invest in mutual funds
        </p>

      </div>

      {/* TOTAL FUNDS */}
      <div className="mb-8">

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6 inline-block">

          <p className="text-slate-300">
            Available Funds
          </p>

          <h2 className="text-4xl font-bold text-cyan-400 mt-3">

            {funds.length}

          </h2>

        </div>

      </div>

      {/* FUNDS GRID */}
      <div className="grid lg:grid-cols-2 gap-6">

        {funds.map((fund, index) => (

          <div
            key={index}
            onClick={() =>
              fetchFundDetails(
                fund.scheme_code,
                fund
              )
            }
            className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-500/30 transition-all cursor-pointer"
          >

            {/* TOP */}
            <div className="flex justify-between items-start gap-6">

              <div>

                <h2 className="text-2xl font-bold">
                  {fund.scheme_name}
                </h2>

                <p className="text-slate-300 mt-2">
                  {fund.amc_name}
                </p>

                <p className="text-slate-500 mt-2">
                  {fund.fund_category}
                  {" • "}
                  {fund.risk_category}
                </p>

              </div>

              <div className="text-right">

                <h3 className="text-cyan-400 text-3xl font-bold">

                  ₹
                  {fund.nav_value}

                </h3>

              </div>

            </div>

            {/* DATE */}
            <div className="mt-6 text-slate-500 text-sm">

              NAV Date:
              {" "}
              {new Date(
                fund.nav_date
              ).toLocaleDateString()}

            </div>

            {/* BUTTON */}
            <button
              className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 transition py-3 rounded-2xl font-semibold"
            >

              Start SIP

            </button>

          </div>

        ))}

      </div>

      {/* MODAL */}
      {showModal && selectedFund && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 overflow-auto">

          <div className="bg-[#0f172a] w-full max-w-6xl rounded-3xl p-8 border border-white/10">

            {/* HEADER */}
            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-4xl font-bold">

                  {selectedFund.scheme_name}

                </h2>

                <p className="text-slate-400 mt-3">

                  {selectedFund.amc_name}

                </p>

              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="bg-red-500/20 text-red-400 px-5 py-2 rounded-xl"
              >

                Close

              </button>

            </div>

            {/* LOADING */}
            {detailsLoading ? (

              <div className="text-cyan-400 mt-10">
                Loading analytics...
              </div>

            ) : (

              <>
                {/* DETAILS */}
                <div className="grid md:grid-cols-4 gap-6 mt-10">

                  <div className="bg-white/5 rounded-2xl p-6">

                    <p className="text-slate-400">
                      NAV Value
                    </p>

                    <h3 className="text-3xl font-bold text-cyan-400 mt-3">

                      ₹
                      {
                        updatedNav !== null
                          ? updatedNav.toFixed(4)
                          : selectedFund.nav_value
                      }

                    </h3>

                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">

                    <p className="text-slate-400">
                      AMC
                    </p>

                    <h3 className="text-xl font-bold mt-3">

                      {selectedFund.amc_name}

                    </h3>

                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">

                    <p className="text-slate-400">
                      Category
                    </p>

                    <h3 className="text-xl font-bold mt-3">

                      {selectedFund.fund_category}

                    </h3>

                  </div>

                  <div className="bg-white/5 rounded-2xl p-6">

                    <p className="text-slate-400">
                      Risk
                    </p>

                    <h3 className="text-xl font-bold mt-3">

                      {selectedFund.risk_category}

                    </h3>

                  </div>

                </div>

                {/* GRAPH */}
                <div className="mt-12">

                  <h2 className="text-3xl font-bold mb-8">
                    NAV Performance
                  </h2>

                  <div className="bg-white/5 rounded-3xl p-6 h-[450px]">

                    {
                      chartData.length > 0 ? (

                        <ResponsiveContainer
                          width="100%"
                          height="100%"
                        >

                          <LineChart
                            data={chartData}
                          >

                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#334155"
                            />

                            <XAxis
                              dataKey="date"
                              stroke="#ffffff"
                            />

                            <YAxis
                              stroke="#ffffff"
                            />

                            <Tooltip />

                            <Line
                              type="monotone"
                              dataKey="nav"
                              stroke="#06b6d4"
                              strokeWidth={4}
                              dot={{
                                r: 5,
                                fill: "#06b6d4",
                              }}
                            />

                          </LineChart>

                        </ResponsiveContainer>

                      ) : (

                        <div className="h-full flex items-center justify-center text-slate-400 text-xl">

                          No NAV history available

                        </div>

                      )
                    }

                  </div>

                </div>

                {/* SIP */}
                <div className="mt-12">

                  <h2 className="text-3xl font-bold mb-6">
                    Start SIP
                  </h2>

                  <div className="flex gap-4">

                    <input
                      type="number"
                      placeholder="Enter SIP Amount"
                      value={sipAmount}
                      onChange={(e) =>
                        setSipAmount(
                          e.target.value
                        )
                      }
                      className="flex-1 bg-[#1e293b] border border-white/10 rounded-2xl px-4 py-3 outline-none text-white"
                    />

                    <button
                      onClick={
                        handleStartSIP
                      }
                      disabled={sipLoading}
                      className="bg-cyan-500 hover:bg-cyan-600 transition px-8 py-3 rounded-2xl font-semibold"
                    >

                      {sipLoading
                        ? "Starting..."
                        : "Start SIP"}

                    </button>

                  </div>

                </div>

              </>

            )}

          </div>

        </div>

      )}

    </div>
  );
}