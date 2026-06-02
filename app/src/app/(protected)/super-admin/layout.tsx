import Navbar from "@/src/components/layout/Navbar";
import SuperAdminSidebar from "@/src/components/layout/SuperAdminSidebar";


export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex bg-[#07111f]">

      {/* SIDEBAR */}
      <SuperAdminSidebar />

      {/* MAIN */}
      <div className="flex-1 min-h-screen">

        <Navbar />

        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}