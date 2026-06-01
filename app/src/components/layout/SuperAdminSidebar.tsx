"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Users,
  Activity,
  Database,
  Landmark,
  LogOut,
  UserPlus,
  TrendingUp,
  BarChart3,
  Wallet
} from "lucide-react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

export default function SuperAdminSidebar() {

  const pathname = usePathname();

  const router = useRouter();

  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/super-admin/dashboard",
    },
    {
      title: "portfolio",
      icon: <Wallet size={20} />,
      path: "/super-admin/portfolio",
    },
    {
      title: "Investors",
      icon: <Users size={20} />,
      path: "/super-admin/investors",
    },

    {
      title: "Add Investor",
      icon: <UserPlus size={20} />,
      path: "/super-admin/add-investor",
    },

    {
      title: "Holdings",
      icon: <TrendingUp size={20} />,
      path: "/super-admin/holdings",
    },

    {
      title: "Transactions",
      icon: <Landmark size={20} />,
      path: "/super-admin/transactions",
    },

    {
      title: "Update NAV",
      icon: <BarChart3 size={20} />,
      path: "/super-admin/update-nav",
    },

    {
      title: "SIP Monitoring",
      icon: <Activity size={20} />,
      path: "/super-admin/sip-monitoring",
    },

    {
      title: "Audit Logs",
      icon: <Database size={20} />,
      path: "/super-admin/audit-logs",
    },

    
  ];

  const handleLogout = () => {

    localStorage.removeItem("user");

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
            Admin
            
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Super Admin Panel
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

        Logout

      </button>

    </div>
  );
}