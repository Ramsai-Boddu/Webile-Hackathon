"use client";

import {
  useEffect,
  useState,
} from "react";

interface AuditLog {

  id?: string;

  action?: string;

  service_name?: string;

  endpoint?: string;

  request_method?: string;

  status_code?: number;

  success?: boolean;

  created_at?: string;
}

export default function AuditLogsPage() {

  const [logs, setLogs] =
    useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {

    getAuditLogs();

  }, []);

 
  const getAuditLogs =
    async () => {

      try {

        setLoading(true);

        setError("");

       
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          setError(
            "Authorization token missing"
          );

          return;
        }

     
        const response =
          await fetch(
            "http://localhost:4000/admin/logs",
            {
              method: "GET",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        
        const data =
          await response.json();

        console.log(
          "AUDIT API RESPONSE:",
          data
        );

       
        if (
          !response.ok ||
          data.success === false
        ) {

          setError(
            data.message ||
            "Failed to fetch logs"
          );

          setLogs([]);

          return;
        }
        let logsArray: AuditLog[] = [];

        if (
          Array.isArray(data)
        ) {

          logsArray = data;

        } else if (
          Array.isArray(data.logs)
        ) {

          logsArray = data.logs;

        } else if (
          Array.isArray(data.data)
        ) {

          logsArray = data.data;

        } else {

          logsArray = [];
        }

        console.log(
          "FINAL LOGS:",
          logsArray
        );

        setLogs(logsArray);

      } catch (error) {

        console.log(
          "FETCH ERROR:",
          error
        );

        setError(
          "Backend connection failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="p-6 min-h-screen bg-[#07111f] text-white">

   
      <div className="mb-10">

        <h1 className="text-5xl font-bold">

          Audit Logs

        </h1>

        <p className="text-slate-400 mt-3 text-lg">

          Platform activity monitoring

        </p>

      </div>
      {
        loading && (

          <div className="text-cyan-400 text-xl">

            Loading audit logs...

          </div>

        )
      }
      {
        error && (

          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6">

            {error}

          </div>

        )
      }
      {
        !loading &&
        logs.length === 0 &&
        !error && (

          <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center text-slate-400 text-xl">

            No audit logs available

          </div>

        )
      }
      <div className="space-y-5">

        {logs.map((log, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-cyan-500/30 transition-all"
          >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              <div>

                <h2 className="text-2xl font-bold text-cyan-400">

                  {log.action || "Unknown Action"}

                </h2>

                <p className="text-slate-400 mt-2">

                  Service:
                  {" "}
                  {log.service_name || "N/A"}

                </p>

                <p className="text-slate-400 mt-2">

                  Endpoint:
                  {" "}
                  {log.endpoint || "N/A"}

                </p>

                <p className="text-slate-400 mt-2">

                  Method:
                  {" "}
                  {log.request_method || "N/A"}

                </p>

              </div>
              <div>

                <p className="text-slate-400 text-sm">

                  Status Code

                </p>

                <h3 className="text-3xl font-bold text-cyan-400 mt-2">

                  {log.status_code || 0}

                </h3>

              </div>
              <div>

                <span
                  className={`px-5 py-2 rounded-xl text-sm font-semibold ${
                    log.success
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >

                  {
                    log.success
                      ? "Success"
                      : "Failed"
                  }

                </span>

                <p className="text-slate-500 text-sm mt-3">

                  {
                    log.created_at
                      ? new Date(
                          log.created_at
                        ).toLocaleString()
                      : "No Date"
                  }

                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}