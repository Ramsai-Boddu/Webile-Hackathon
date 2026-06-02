"use client";

import {useEffect,useState,} from "react";

import DashboardCards from "@/components/dashboard/DashboardCards";
import PortfolioOverview from "@/components/dashboard/PortfolioOverview";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import WealthAnalytics from "@/components/dashboard/WealthAnalytics";
import InvestorsSection from "@/components/dashboard/InvestorsSection";
import AssetAllocationChart from "@/components/charts/AssetAllocationChart";

interface User {
  fullName: string;
}

export default function DashboardPage() {

  const [user, setUser] =
    useState<User>({
      fullName: "",
    });

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {

      const parsedUser =
        JSON.parse(storedUser);

      console.log(
        "LOGGED USER:",
        parsedUser
      );

      setUser({
        fullName:
          parsedUser.fullName || "",
      });
    }

  }, []);

  return (

    <div className="min-h-screen bg-[#07111f] text-white p-6">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Investor Dashboard

        </h1>

        <p className="text-slate-400 mt-2">

          Welcome back,
          {" "}
          {user.fullName}
          {" "}
          👋

        </p>

      </div>

      {/* DASHBOARD CARDS */}
      <DashboardCards />

      {/* CHART */}
      <div className="mt-8">

        <AssetAllocationChart />

      </div>

      {/* PORTFOLIO */}
      <div className="mt-8">

        <PortfolioOverview />

      </div>

      {/* ANALYTICS */}
      <div className="mt-8">

        <WealthAnalytics />

      </div>

      {/* INVESTOR DETAILS */}
      <div className="mt-8">

        <InvestorsSection />

      </div>

      {/* TRANSACTIONS */}
      <div className="mt-8">

        <RecentTransactions />

      </div>

    </div>
  );
}