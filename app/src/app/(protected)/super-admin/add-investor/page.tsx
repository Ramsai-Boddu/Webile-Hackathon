"use client";

import {
  useState,
} from "react";

export default function AddInvestorPage() {

  const [formData, setFormData] =
    useState({
      investorId: "",
      customerRef: "",
      fullName: "",
      email: "",
      mobile: "",
      panNumber: "",
      dematAccount: "",
      folioNumber: "",
      password: "",
      role: "INVESTOR",
    });

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      setLoading(true);

      setMessage("");

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
            "http://localhost:4000/admin/addinvestor",
            {
              method: "POST",

              mode: "cors",

              credentials:
                "include",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify(
                formData
              ),
            }
          );

        const data =
          await response.json();

        console.log(data);

        if (!response.ok) {

          setMessage(
            data.message ||
              "Failed to add investor"
          );

          return;
        }

        setMessage(
          "Investor added successfully"
        );
        setFormData({
          investorId: "",
          customerRef: "",
          fullName: "",
          email: "",
          mobile: "",
          panNumber: "",
          dematAccount: "",
          folioNumber: "",
          password: "",
          role: "INVESTOR",
        });

      } catch (error) {

        console.log(error);

        setMessage(
          "Backend connection failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="p-6 text-white">
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Add Investor
        </h1>

        <p className="text-slate-400 mt-2">
          Create new investor account
        </p>

      </div>


      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >

  
        <input
          type="text"
          name="investorId"
          placeholder="Investor ID"
          value={
            formData.investorId
          }
          onChange={
            handleChange
          }
          required
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />
        <input
          type="text"
          name="customerRef"
          placeholder="Customer Ref"
          value={
            formData.customerRef
          }
          onChange={
            handleChange
          }
          required
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={
            formData.fullName
          }
          onChange={
            handleChange
          }
          required
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={
            formData.email
          }
          onChange={
            handleChange
          }
          required
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          value={
            formData.mobile
          }
          onChange={
            handleChange
          }
          required
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />

        <input
          type="text"
          name="panNumber"
          placeholder="PAN Number"
          value={
            formData.panNumber
          }
          onChange={
            handleChange
          }
          required
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />

       
        <input
          type="text"
          name="dematAccount"
          placeholder="Demat Account"
          value={
            formData.dematAccount
          }
          onChange={
            handleChange
          }
          required
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />

       
        <input
          type="text"
          name="folioNumber"
          placeholder="Folio Number"
          value={
            formData.folioNumber
          }
          onChange={
            handleChange
          }
          required
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />

      
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={
            formData.password
          }
          onChange={
            handleChange
          }
          required
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={
            formData.role
          }
          onChange={
            handleChange
          }
          className="bg-white/5 border border-white/10 rounded-2xl p-4 outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 transition-all rounded-2xl p-4 font-semibold"
        >
          {loading
            ? "Adding..."
            : "Add Investor"}

        </button>

      </form>
      {message && (

        <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 text-cyan-400">

          {message}

        </div>

      )}

    </div>
  );
}