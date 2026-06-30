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
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(null);

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

      const text = await res.text();
      console.log("RAW:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        alert("Server error: API mengirim HTML!");
        return;
      }

      if (!res.ok) {
        alert(data.error || "Login gagal");
        return;
      }

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);

      alert("Login berhasil!");

      if (data.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        window.location.href = "/user/home";
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  const icons = {
    mail: <path d="M21 5H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm-1.4 2L12 12.4 4.4 7zM4 17V8.4l7.4 5a1 1 0 0 0 1.2 0l7.4-5V17z" />,
    lock: <path d="M17 9V7a5 5 0 0 0-10 0v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3zM9 7a3 3 0 0 1 6 0v2H9z" />,
    eye: <path d="M12 5c-5.5 0-9.3 4.3-10.6 6.4a1.5 1.5 0 0 0 0 1.6C2.7 15.1 6.5 19.4 12 19.4s9.3-4.3 10.6-6.4a1.5 1.5 0 0 0 0-1.6C21.3 9.3 17.5 5 12 5zm0 12a4.6 4.6 0 1 1 0-9.2 4.6 4.6 0 0 1 0 9.2zm0-2a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z" />,
    eyeOff: <path d="M3.3 2.3 21.7 20.7l-1.4 1.4-3-3C15.7 19.7 13.9 20 12 20 6.5 20 2.7 15.7 1.4 13.6a1.5 1.5 0 0 1 0-1.6c.6-1 1.6-2.4 3-3.7l-2.5-2.6zM12 7a4.6 4.6 0 0 1 4.6 4.6c0 .6-.1 1.2-.4 1.7l-1.5-1.5c.06-.2.09-.4.09-.6a2.6 2.6 0 0 0-2.8-2.8l-1.5-1.5c.5-.25 1-.4 1.6-.4zm0-5c5.5 0 9.3 4.3 10.6 6.4.3.5.3 1.1 0 1.6-.5.8-1.4 2-2.6 3.2l-1.4-1.4c1-1 1.7-1.9 2.2-2.6C19.3 7.3 16 4 12 4c-1 0-1.9.15-2.8.45L7.7 3a11.8 11.8 0 0 1 4.3-1z" />,
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B1B33] px-4 py-12">
      <style jsx global>{`
        @keyframes meshFloatA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.08); }
        }
        @keyframes meshFloatB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-35px, 35px) scale(1.05); }
        }
        @keyframes meshFloatC {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 25px) scale(0.95); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.9) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-7px) rotate(2deg); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(220%); }
        }

        .mesh-a { animation: meshFloatA 14s ease-in-out infinite; }
        .mesh-b { animation: meshFloatB 17s ease-in-out infinite; }
        .mesh-c { animation: meshFloatC 12s ease-in-out infinite; }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
        .pop-in { animation: popIn 0.55s cubic-bezier(.22,1,.36,1) both; }
        .badge-float { animation: badgeFloat 5s ease-in-out infinite; }
      `}</style>

      {/* vivid gradient mesh background */}
      <div
        className="mesh-a pointer-events-none absolute -top-32 -left-20 h-[460px] w-[460px] rounded-full opacity-60 blur-[100px]"
        style={{ background: "radial-gradient(circle, #2E6FB0 0%, transparent 70%)" }}
      />
      <div
        className="mesh-b pointer-events-none absolute top-10 right-[-120px] h-[420px] w-[420px] rounded-full opacity-50 blur-[110px]"
        style={{ background: "radial-gradient(circle, #D85A30 0%, transparent 70%)" }}
      />
      <div
        className="mesh-c pointer-events-none absolute bottom-[-140px] left-1/3 h-[480px] w-[480px] rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(circle, #F4C77A 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full opacity-40 blur-[100px]"
        style={{ background: "radial-gradient(circle, #5B3A8E 0%, transparent 70%)" }}
      />

      {/* faint dot texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]">
        <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#FFFFFF" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* centered card */}
      <div className="relative z-10 w-full max-w-[560px]">
        <div className="pop-in relative">
          <div className="badge-float absolute -top-11 left-1/2 z-20 -translate-x-1/2">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-2xl bg-white shadow-[0_12px_30px_-8px_rgba(216,90,48,0.45)] ring-1 ring-black/5">
              <Image src="/icon hp.png" alt="Starbhak Library" width={56} height={56} className="object-contain" />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/95 px-12 pb-12 pt-20 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="text-center">
              <h2 className="fade-up font-serif text-[32px] font-semibold text-[#0A3D6E]">
                Selamat datang kembali
              </h2>
              <p className="fade-up mt-2 text-[15px] text-[#5C6B7A]" style={{ animationDelay: "0.06s" }}>
                Masuk untuk lanjut menjelajahi Starbhak Library.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              <div className="fade-up" style={{ animationDelay: "0.12s" }}>
                <label htmlFor="email" className="mb-2 block text-[14px] font-medium text-[#0A3D6E]">
                  Alamat Email<span className="ml-0.5 text-[#D85A30]">*</span>
                </label>
                <div className="relative">
                  <svg
                    className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-[1.6] transition-colors duration-200 ${
                      focused === "email" ? "stroke-[#D85A30]" : "stroke-[#A6B2BF]"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    {icons.mail}
                  </svg>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="nama@sekolah.sch.id"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full rounded-xl border border-[#E3E6EA] bg-[#F8F9FB] py-3.5 pl-12 pr-4 text-[16px] text-[#0A3D6E] placeholder:text-[#A6B2BF] outline-none transition-all duration-200 focus:-translate-y-0.5 focus:border-[#D85A30] focus:bg-white focus:shadow-[0_6px_16px_rgba(216,90,48,0.14)] focus:ring-2 focus:ring-[#D85A30]/15"
                  />
                </div>
              </div>

              <div className="fade-up" style={{ animationDelay: "0.18s" }}>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-[14px] font-medium text-[#0A3D6E]">
                    Password<span className="ml-0.5 text-[#D85A30]">*</span>
                  </label>
                  <a href="/auth/forgot-password" className="text-sm font-medium text-[#D85A30] hover:underline">
                    Lupa password?
                  </a>
                </div>
                <div className="relative">
                  <svg
                    className={`pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 fill-none stroke-[1.6] transition-colors duration-200 ${
                      focused === "password" ? "stroke-[#D85A30]" : "stroke-[#A6B2BF]"
                    }`}
                    viewBox="0 0 24 24"
                  >
                    {icons.lock}
                  </svg>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full rounded-xl border border-[#E3E6EA] bg-[#F8F9FB] py-3.5 pl-12 pr-12 text-[16px] text-[#0A3D6E] placeholder:text-[#A6B2BF] outline-none transition-all duration-200 focus:-translate-y-0.5 focus:border-[#D85A30] focus:bg-white focus:shadow-[0_6px_16px_rgba(216,90,48,0.14)] focus:ring-2 focus:ring-[#D85A30]/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7C92A8] transition-colors hover:text-[#0A3D6E]"
                  >
                    <svg className="h-5 w-5 fill-none stroke-current stroke-[1.6]" viewBox="0 0 24 24">
                      {showPassword ? icons.eyeOff : icons.eye}
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="fade-up group relative mt-3 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#0A3D6E] to-[#0E4D8A] py-4 text-[16px] font-medium text-white shadow-[0_10px_24px_-8px_rgba(10,61,110,0.5)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                style={{ animationDelay: "0.3s" }}
              >
                <span
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-white/20"
                  style={{ animation: "shine 2.6s ease-in-out infinite" }}
                />
                {loading && (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.7s linear infinite" }}>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                <span className="relative">{loading ? "Masuk..." : "Masuk"}</span>
              </button>
            </form>

            <p className="fade-up mt-7 text-center text-[15px] text-[#5C6B7A]" style={{ animationDelay: "0.38s" }}>
              Belum punya akun?{" "}
              <a href="/auth/register" className="font-medium text-[#D85A30] underline-offset-2 transition-colors hover:underline">
                Register di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}