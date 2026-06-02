"use client";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface Stock {
  stock_symbol: string;
  company_name: string;
  exchange: string;
  sector: string;
  price: string;
  recorded_at: string;
}

interface StockHistory {
  price?: string;
  current_market_price?: string;
  recorded_at?: string;
}

export default function StocksPage() {

  const [stocks, setStocks] =
    useState<Stock[]>([]);

  const [ownedStocks, setOwnedStocks] =
    useState<string[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedStock, setSelectedStock] =
    useState<string | null>(null);

  const [quantity, setQuantity] =
    useState("");

  const [actionType, setActionType] =
    useState<"BUY" | "SELL" | null>(null);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [showDetails, setShowDetails] =
    useState(false);

  const [selectedStockData, setSelectedStockData] =
    useState<Stock | null>(null);

  const [stockHistory, setStockHistory] =
    useState<StockHistory[]>([]);

  const [historyLoading, setHistoryLoading] =
    useState(false);

  const [updatedPrice, setUpdatedPrice] =
    useState<number | null>(null);

  // GET TOKEN
  const getToken = () => {

    return document.cookie
      .split("; ")
      .find((row) =>
        row.startsWith("token=")
      )
      ?.split("=")[1];
  };

  // GET USER
  const getUser = () => {

    const userCookie =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith("user=")
        );

    if (!userCookie) {
      return null;
    }

    return JSON.parse(
      decodeURIComponent(
        userCookie.split("=")[1]
      )
    );
  };

  // FETCH INITIAL DATA
  useEffect(() => {

    fetchStocks();

    fetchPortfolio();

  }, []);

  // FETCH STOCKS
  async function fetchStocks() {

    try {

      const token =
        getToken();

      const response =
        await axios.get(
          "http://localhost:4000/bs/market/stocks",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setStocks(
        response.data.stocks || []
      );

    } catch (err) {

      console.log(err);

      setError(
        "Failed to fetch stocks"
      );

    } finally {

      setLoading(false);

    }
  }

  // FETCH PORTFOLIO
  async function fetchPortfolio() {

    try {

      const token =
        getToken();

      const user =
        getUser();

      if (!user) return;

      const response =
        await axios.get(
          `http://localhost:4000/portfolio/${user.investorId}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const holdings =
        response.data.data.equity.holdings || [];

      const symbols =
        holdings.map(
          (
            item: {
              stock_symbol: string
            }
          ) =>
            item.stock_symbol
        );

      setOwnedStocks(
        symbols
      );

    } catch (err) {

      console.log(err);

    }
  }

  // FETCH HISTORY
  const fetchStockHistory =
    async (stock: Stock) => {

      try {

        setHistoryLoading(true);

        setShowDetails(true);

        setSelectedStockData(stock);

        setUpdatedPrice(null);

        const token =
          getToken();

        const response =
          await axios.get(
            `http://localhost:4000/bs/stock-history/${stock.stock_symbol}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        let historyData:
          StockHistory[] = [];

        if (
          Array.isArray(response.data)
        ) {

          historyData =
            response.data;

        } else if (
          Array.isArray(
            response.data.data
          )
        ) {

          historyData =
            response.data.data;

        } else if (
          Array.isArray(
            response.data.history
          )
        ) {

          historyData =
            response.data.history;

        } else if (
          Array.isArray(
            response.data.data?.history
          )
        ) {

          historyData =
            response.data.data.history;
        }

        setStockHistory(
          historyData
        );

      } catch (error) {

        console.log(error);

        setStockHistory([]);

      } finally {

        setHistoryLoading(false);

      }
    };

  // CHART DATA
  const chartData =
    stockHistory.map(
      (item) => ({

        date:
          item.recorded_at
            ? new Date(
                item.recorded_at
              ).toLocaleDateString()
            : "N/A",

        price:
          item.price
            ? parseFloat(
                item.price
              )
            : item.current_market_price
            ? parseFloat(
                item.current_market_price
              )
            : 0,
      })
    );

  // BUY STOCK
  const handleBuyStock =
    async () => {

      try {

        setActionLoading(true);

        const token =
          getToken();

        const user =
          getUser();

        if (!user) return;

        await axios.post(
          "http://localhost:4000/bs/buy",
          {
            investorId:
              user.investorId,

            stockSymbol:
              selectedStock,

            quantity:
              Number(quantity),
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          `${selectedStock} bought successfully`
        );

        setSelectedStock(null);

        setQuantity("");

        setActionType(null);

        fetchPortfolio();

      } catch (err: unknown) {

        console.log(err);

        if (
          axios.isAxiosError(err)
        ) {

          alert(
            err.response?.data?.message ||
            "Failed to buy stock"
          );

        } else {

          alert(
            "Failed to buy stock"
          );
        }

      } finally {

        setActionLoading(false);

      }
    };

  // SELL STOCK
  const handleSellStock =
    async () => {

      try {

        setActionLoading(true);

        const token =
          getToken();

        const user =
          getUser();

        if (!user) return;

        await axios.post(
          "http://localhost:4000/bs/sell",
          {
            investorId:
              user.investorId,

            stockSymbol:
              selectedStock,

            quantity:
              Number(quantity),
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          `${selectedStock} sold successfully`
        );

        setSelectedStock(null);

        setQuantity("");

        setActionType(null);

        fetchPortfolio();

      } catch (err: unknown) {

        console.log(err);

        if (
          axios.isAxiosError(err)
        ) {

          alert(
            err.response?.data?.message ||
            "Failed to sell stock"
          );

        } else {

          alert(
            "Failed to sell stock"
          );
        }

      } finally {

        setActionLoading(false);

      }
    };

  if (loading) {

    return (
      <div className="text-white p-6">
        Loading stocks...
      </div>
    );
  }

  if (error) {

    return (
      <div className="text-red-400 p-6">
        {error}
      </div>
    );
  }

  return (
    <div className="text-white p-6 min-h-screen bg-[#07111f]">

      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Stocks Market
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          Buy and sell stocks in realtime
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {stocks.map((stock, index) => (

          <div
            key={index}
            onClick={() =>
              fetchStockHistory(stock)
            }
            className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-500/30 transition-all cursor-pointer"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-3xl font-bold">
                  {stock.stock_symbol}
                </h2>

                <p className="text-slate-300 mt-2 text-lg">
                  {stock.company_name}
                </p>

                <p className="text-slate-500 mt-2">
                  {stock.exchange}
                  {" • "}
                  {stock.sector}
                </p>

              </div>

              <div className="text-right">

                <h3 className="text-cyan-400 text-4xl font-bold">

                  ₹
                  {stock.price}

                </h3>

              </div>

            </div>

            <div className="mt-6 text-slate-500 text-sm">

              Updated:
              {" "}
              {new Date(
                stock.recorded_at
              ).toLocaleString()}

            </div>

            <div
              className="flex gap-4 mt-8"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                onClick={() => {

                  setSelectedStock(
                    stock.stock_symbol
                  );

                  setActionType("BUY");
                }}
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 transition px-6 py-3 rounded-2xl font-semibold"
              >

                Buy Stock

              </button>

              <button
                disabled={
                  !ownedStocks.includes(
                    stock.stock_symbol
                  )
                }
                onClick={() => {

                  setSelectedStock(
                    stock.stock_symbol
                  );

                  setActionType("SELL");
                }}
                className={`flex-1 transition px-6 py-3 rounded-2xl font-semibold ${
                  ownedStocks.includes(
                    stock.stock_symbol
                  )
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >

                {
                  ownedStocks.includes(
                    stock.stock_symbol
                  )
                    ? "Sell Stock"
                    : "Not Owned"
                }

              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}