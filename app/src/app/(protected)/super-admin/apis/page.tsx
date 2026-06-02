"use client";

import {
  useEffect,
  useState,
} from "react";

export default function ApiMonitoringPage() {

  const [apis, setApis] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchApis =
      async () => {

        try {

          // TOKEN
          const token =
            document.cookie
              .split("; ")
              .find((row) =>
                row.startsWith(
                  "token="
                )
              )
              ?.split("=")[1];

          // USING AUDIT LOGS API
          const response =
            await fetch(
              "http://localhost:4000/admin/logs",
              {
                method: "GET",

                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          console.log(data);

          if (!response.ok) {
            return;
          }

          setApis(
            data.logs || []
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchApis();

  }, []);

  return (

    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          API Monitoring
        </h1>

        <p className="text-slate-400 mt-3">
          Realtime API activity tracking
        </p>

      </div>

      {/* LOADING */}
      {loading && (

        <div className="text-cyan-400">
          Loading APIs...
        </div>

      )}

      {/* API LIST */}
      <div className="space-y-5">

        {apis.map((api, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
          >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* LEFT */}
              <div>

                <h2 className="text-2xl font-semibold text-cyan-400">

                  {api.endpoint}

                </h2>

                <p className="text-slate-400 mt-2">

                  Service:
                  {" "}
                  {api.service_name}

                </p>

                <p className="text-slate-400 mt-2">

                  Method:
                  {" "}
                  {api.request_method}

                </p>

              </div>

              {/* CENTER */}
              <div>

                <p className="text-slate-400 text-sm">

                  Response Time

                </p>

                <h3 className="text-3xl font-bold text-cyan-400 mt-2">

                  {api.response_time_ms}
                  ms

                </h3>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-3">

                <span
                  className={`px-5 py-2 rounded-xl text-sm font-semibold text-center
                  ${
                    api.success
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >

                  {api.success
                    ? "Healthy"
                    : "Failed"}

                </span>

                <span className="bg-white/5 px-5 py-2 rounded-xl text-sm text-slate-300 text-center">

                  {api.status_code}

                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}