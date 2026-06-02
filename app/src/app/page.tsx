export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07111f] text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#081120]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">

          {/* LOGO */}
          <div>
            <h1 className="text-3xl font-bold tracking-wide">
              Wealth
              <span className="text-cyan-400">
                AI
              </span>
            </h1>

            <p className="text-[10px] text-slate-400 tracking-[3px] uppercase">
              Unified Wealth Intelligence
            </p>
          </div>

          {/* MENUS */}
          <div className="hidden lg:flex items-center gap-10 text-slate-300 font-medium">
            <a href="#features" className="hover:text-cyan-400 transition-all">
              Features
            </a>

            <a href="#analytics" className="hover:text-cyan-400 transition-all">
              Analytics
            </a>

            <a href="#investors" className="hover:text-cyan-400 transition-all">
              Investors
            </a>

            <a href="#operations" className="hover:text-cyan-400 transition-all">
              Operations
            </a>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-4">

            <a
              href="/login"
              className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
            >
              Login
            </a>

            <a
              href="/dashboard"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 transition-all"
            >
              Dashboard
            </a>

          </div>

        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-24">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full"></div>

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* LEFT CONTENT */}
          <div>

            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full text-cyan-400 mb-6">
              AI Powered Wealth Intelligence Platform
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Unified
              <span className="text-cyan-400 block mt-2">
                Wealth Monitoring
              </span>
            </h1>

            <p className="text-slate-400 text-xl mt-8 leading-relaxed max-w-2xl">
              Centralized operational dashboard for stocks, mutual funds,
              investor operations, portfolio intelligence and realtime
              analytics.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <a
                href="/dashboard"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold text-lg hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
              >
                Explore Dashboard
              </a>

              <a
                href="#features"
                className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-lg"
              >
                Learn More
              </a>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 mt-16">

              <div>
                <h2 className="text-4xl font-bold text-cyan-400">
                  10K+
                </h2>

                <p className="text-slate-400 mt-2">
                  Investors
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-cyan-400">
                  ₹500Cr+
                </h2>

                <p className="text-slate-400 mt-2">
                  Assets Managed
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold text-cyan-400">
                  99.9%
                </h2>

                <p className="text-slate-400 mt-2">
                  Platform Uptime
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT DASHBOARD MOCKUP */}
          <div className="relative">

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">

              {/* TOP */}
              <div className="flex items-center justify-between mb-8">

                <div>
                  <h2 className="text-2xl font-bold">
                    Portfolio Overview
                  </h2>

                  <p className="text-slate-400 mt-1">
                    Wealth Analytics Dashboard
                  </p>
                </div>

                <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-xl text-sm">
                  System Healthy
                </div>

              </div>

              {/* CARDS */}
              <div className="grid grid-cols-2 gap-5">

                <div className="bg-[#0f1c2e] rounded-2xl p-5 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Total Wealth
                  </p>

                  <h3 className="text-3xl font-bold mt-4 text-cyan-400">
                    ₹5.2Cr
                  </h3>
                </div>

                <div className="bg-[#0f1c2e] rounded-2xl p-5 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Active SIPs
                  </p>

                  <h3 className="text-3xl font-bold mt-4 text-cyan-400">
                    24
                  </h3>
                </div>

                <div className="bg-[#0f1c2e] rounded-2xl p-5 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Mutual Funds
                  </p>

                  <h3 className="text-3xl font-bold mt-4 text-cyan-400">
                    ₹1.4Cr
                  </h3>
                </div>

                <div className="bg-[#0f1c2e] rounded-2xl p-5 border border-white/5">
                  <p className="text-slate-400 text-sm">
                    Stocks
                  </p>

                  <h3 className="text-3xl font-bold mt-4 text-cyan-400">
                    ₹90L
                  </h3>
                </div>

              </div>

              {/* ACTIVITY */}
              <div className="mt-8 bg-[#0f1c2e] rounded-2xl p-5 border border-white/5">

                <div className="flex items-center justify-between mb-5">

                  <h3 className="text-xl font-semibold">
                    Realtime Operations
                  </h3>

                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

                </div>

                <div className="space-y-4">

                  <div className="flex justify-between text-slate-300">
                    <span>Stock API Status</span>
                    <span className="text-green-400">Active</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Redis Cache</span>
                    <span className="text-green-400">Healthy</span>
                  </div>

                  <div className="flex justify-between text-slate-300">
                    <span>Investor Requests</span>
                    <span className="text-cyan-400">2,540</span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">

            <h2 className="text-5xl font-bold">
              Platform Features
            </h2>

            <p className="text-slate-400 text-xl mt-6 max-w-3xl mx-auto">
              Enterprise-grade operational wealth management platform with
              realtime analytics and intelligent monitoring.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "Unified Portfolio Monitoring",
              "Realtime Wealth Analytics",
              "Investor Intelligence",
              "Operational Monitoring",
              "Secure RBAC Authentication",
              "Redis Accelerated Performance",
            ].map((feature, index) => (

              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all hover:translate-y-[-5px]"
              >

                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-2xl font-bold mb-6">
                  0{index + 1}
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {feature}
                </h3>

                <p className="text-slate-400 leading-relaxed">
                  Intelligent operational infrastructure for scalable wealth
                  management systems and investor monitoring.
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

    </div>
  );
}
