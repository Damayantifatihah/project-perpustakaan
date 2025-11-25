"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // SIMPAN USER KE LOCALSTORAGE
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login berhasil!");
        router.push("/user/home");
      } else {
        alert(data.error || "Login gagal");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-[#083A6F] flex items-center justify-center">
        <Image
          src="/icon hp.png"
          alt="Library Illustration"
          width={420}
          height={420}
          className="object-contain"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <h2 className="text-[#083A6F] text-lg font-semibold mb-8">
          Welcome Back to Starbhak Library!
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-64 text-[#083A6F] px-4 py-2 border border-[#083A6F] rounded-md focus:ring-2 focus:ring-[#083A6F]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-64 text-[#083A6F] px-4 py-2 border border-[#083A6F] rounded-md focus:ring-2 focus:ring-[#083A6F]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-32 text-center shadow-md py-2.5 text-[15px] font-medium rounded-md text-white bg-[#083A6F] hover:bg-[#0A4B9A] transition disabled:opacity-60"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#083A6F]">
          Belum punya akun?{" "}
          <a
            href="/auth/register"
            className="font-semibold underline hover:text-[#0A4B9A]"
          >
            Register di sini
          </a>
        </p>
      </div>
    </div>
  );
}
