"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Wallet,
  CandlestickChart,
  BadgeIndianRupee,
  Landmark,
  User,
  
  LogOut,
} from "lucide-react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

export default function Sidebar() {

  const pathname = usePathname();

  const router = useRouter();

  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },

    {
      title: "Portfolio",
      icon: <Wallet size={20} />,
      path: "/portfolio",
    },

    {
      title: "Stocks",
      icon: <CandlestickChart size={20} />,
      path: "/stocks",
    },

    {
      title: "Mutual Funds",
      icon: <BadgeIndianRupee size={20} />,
      path: "/mutual-funds",
    },

    {
      title: "SIP Monitoring",
      icon: <Landmark size={20} />,
      path: "/sip-monitoring",
    },

    {
      title: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },

    
  ];

  const handleLogout = () => {

    localStorage.clear();

    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    document.cookie =
      "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    router.push("/login");
  };

  return (
    <div className="hidden md:flex fixed left-0 top-0 w-72 h-screen bg-[#081120] border-r border-white/10 p-6 flex-col justify-between z-50">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-12">

          <h1 className="text-4xl font-bold text-white">
            Wealth
            
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Investor Dashboard
          </p>

        </div>

        {/* MENUS */}
        <div className="space-y-3">

          {menus.map((menu, index) => (

            <Link
              key={index}
              href={menu.path}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all font-medium ${
                pathname === menu.path
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                  : "text-slate-300 hover:bg-cyan-500/10 hover:text-white"
              }`}
            >

              {menu.icon}

              <span>
                {menu.title}
              </span>

            </Link>

          ))}

        </div>

      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-4 text-red-400 hover:bg-red-500/10 p-4 rounded-2xl transition-all"
      >

        <LogOut size={20} />

        <span>
          Logout
        </span>

      </button>

    </div>
  );
}