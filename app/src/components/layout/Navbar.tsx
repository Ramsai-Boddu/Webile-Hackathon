"use client";

import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

interface User {
  name: string;
  role: string;
}

export default function Navbar() {

  const [user, setUser] = useState<User>({
    name: "",
    role: "",
  });

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      const parsedUser: User = JSON.parse(storedUser);

      setUser({
        name: parsedUser.name || "",
        role: parsedUser.role || "",
      });
    }

  }, []);

  return (
    <div className="w-full h-[80px] bg-[#081120] border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-40">

      {/* LEFT */}
      <div>

        <h1 className="text-2xl font-bold text-white">
          Welcome Back 👋
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Unified Wealth Intelligence Platform
        </p>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">

        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-[280px]">

          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none px-3 text-sm text-white w-full"
          />

        </div>

        {/* NOTIFICATION */}
        <button className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/10 transition-all">

          <Bell
            size={20}
            className="text-white"
          />

        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">

          <UserCircle2
            size={34}
            className="text-cyan-400"
          />

          <div className="hidden md:block">

            <h3 className="text-white text-sm font-semibold">
              {user.name}
            </h3>

            <p className="text-slate-400 text-xs">
              {user.role}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}