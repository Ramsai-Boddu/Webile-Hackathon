import SuperAdminSidebar from "@/components/layout/SuperAdminSidebar";
import Navbar from "@/components/layout/Navbar";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#07111f] min-h-screen">

      {/* FIXED SIDEBAR */}
      <SuperAdminSidebar />

      {/* MAIN CONTENT */}
      <div className="ml-72 min-h-screen">

        <Navbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}