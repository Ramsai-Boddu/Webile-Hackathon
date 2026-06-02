"use client";

import {
  useEffect,
  useState,
} from "react";

export default function UsersPage() {

  const [users, setUsers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refresh, setRefresh] =
    useState(false);

  useEffect(() => {

    const fetchUsers =
      async () => {

        try {

          const token =
            document.cookie
              .split("; ")
              .find((row) =>
                row.startsWith(
                  "token="
                )
              )
              ?.split("=")[1];

          const response =
            await fetch(
              "http://localhost:4000/admin/investors",
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

          setUsers(
            data.investors || []
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);
        }
      };

    fetchUsers();

  }, [refresh]);

  // TOGGLE STATUS
  const toggleStatus =
    async (
      investorId: string
    ) => {

      try {

        const token =
          document.cookie
            .split("; ")
            .find((row) =>
              row.startsWith(
                "token="
              )
            )
            ?.split("=")[1];

        const response =
          await fetch(
            `http://localhost:4000/admin/investor/${investorId}/deactivate`,
            {
              method: "PATCH",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

        console.log(data);

        // REFRESH USERS
        setRefresh(
          !refresh
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-5xl font-bold">
          Users
        </h1>

        <p className="text-slate-400 mt-3">
          Platform user management
        </p>

      </div>

      {/* LOADING */}
      {loading && (

        <div className="text-cyan-400">
          Loading users...
        </div>

      )}

      {/* USERS */}
      <div className="space-y-5">

        {users.map((user, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-3xl p-6"
          >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

              {/* LEFT */}
              <div>

                <h2 className="text-2xl font-semibold">

                  {user.full_name}

                </h2>

                <p className="text-slate-400 mt-2">

                  {user.email}

                </p>

                <p className="text-slate-500 mt-2">

                  PAN:
                  {" "}
                  {user.pan_number}

                </p>

              </div>

              {/* CENTER */}
              <div>

                <p className="text-slate-400 text-sm">

                  Investor ID

                </p>

                <h3 className="text-2xl font-bold text-cyan-400 mt-2">

                  {user.investor_id}

                </h3>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-3">

                {/* ROLE */}
                <span
                  className="bg-cyan-500/10 text-cyan-400 px-5 py-2 rounded-xl text-sm font-semibold text-center"
                >

                  {user.role_name || "INVESTOR"}

                </span>

                {/* STATUS BUTTON */}
                <button
                  onClick={() =>
                    toggleStatus(
                      user.investor_id
                    )
                  }
                  className={`px-5 py-2 rounded-xl text-sm font-semibold
                  ${
                    user.is_active
                      ? "bg-red-500/10 text-red-400"
                      : "bg-green-500/10 text-green-400"
                  }`}
                >

                  {user.is_active
                    ? "Disable"
                    : "Enable"}

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}