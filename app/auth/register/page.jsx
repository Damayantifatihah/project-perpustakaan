"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    kelasJurusan: "",
    telepon: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi tidak sama!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namaLengkap: formData.namaLengkap,
          email: formData.email,
          kelasJurusan: formData.kelasJurusan,
          telepon: formData.telepon,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // SIMPAN USER KE LOCALSTORAGE
        localStorage.setItem(
          "user",
          JSON.stringify({
            nama: formData.namaLengkap,
            kelas: formData.kelasJurusan,
            email: formData.email,
            telepon: formData.telepon,
          })
        );

        alert("Registrasi berhasil!");
        router.push("/user/login");
      } else {
        alert(data.error || "Gagal registrasi");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Terjadi kesalahan server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-[#083A6F] flex items-center justify-center">
        <Image
          src="/icon hp.png"
          alt="Library Illustration"
          width={420}
          height={420}
          className="object-contain"
        />
      </div>

      <div className="w-1/2 flex flex-col items-center justify-center bg-white px-10">
        <h2 className="text-[#083A6F] text-2xl font-semibold mb-6">
          Welcome to Starbhak Library!
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-5 w-[80%] max-w-md"
        >
          <input
            type="text"
            name="namaLengkap"
            placeholder="Nama Lengkap"
            value={formData.namaLengkap}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Alamat Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
            required
          />

          <input
            type="text"
            name="kelasJurusan"
            placeholder="Kelas & Jurusan"
            value={formData.kelasJurusan}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
          />

          <input
            type="text"
            name="telepon"
            placeholder="Nomor Telepon"
            value={formData.telepon}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full text-center shadow-md py-3 text-[15px] font-medium rounded-md text-white bg-[#083A6F] hover:bg-[#0A4B9A] transition disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#083A6F]">
          Sudah punya akun?{" "}
          <a href="/auth/login" className="font-semibold underline hover:text-[#0A4B9A]">
            Login di sini
          </a>
        </p>
      </div>
    </div>
  );
}
