"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { usePathname } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const isSuperAdmin =
    pathname.startsWith("/super-admin");

  return (
    <div className="bg-[#07111f] min-h-screen">

      {/* INVESTOR SIDEBAR */}
      {!isSuperAdmin && <Sidebar />}

      {/* MAIN CONTENT */}
      <div
        className={`min-h-screen ${
          !isSuperAdmin ? "ml-72" : ""
        }`}
      >

        {/* INVESTOR NAVBAR */}
        {!isSuperAdmin && <Navbar />}

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}