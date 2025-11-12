"use client";

import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex h-screen">
      {/* ==== LEFT SIDE ==== */}
      <div className="w-1/2 bg-[#083A6F] flex items-center justify-center">
        <Image
          src="/icon hp.png"
          alt="Library Illustration"
          width={420}
          height={420}
          className="object-contain"
        />
      </div>

      {/* ==== RIGHT SIDE ==== */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white px-10">
        <h2 className="text-[#083A6F] text-2xl font-semibold mb-10">
          Welcome to Starbhak Library!
        </h2>

        {/* Form Register */}
        <form className="flex flex-col items-center space-y-5 w-[80%] max-w-md">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
          />
          <input
            type="text"
            placeholder="NIPD"
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
          />
          <input
            type="text"
            placeholder="Kelas & Jurusan"
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border border-[#083A6F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#083A6F] text-[#083A6F]"
          />

          {/* Tombol Daftar */}
          <Link
            href="/home"
            className="w-full text-center shadow-md py-3 text-[15px] font-medium rounded-md text-white bg-[#083A6F] hover:bg-[#0A4B9A] transition"
          >
            Daftar
          </Link>
        </form>

        {/* Sudah punya akun */}
        <p className="mt-6 text-sm text-[#083A6F]">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold underline hover:text-[#0A4B9A]">
            Login di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
