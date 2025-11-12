"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
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
      <div className="w-1/2 flex flex-col items-center justify-center bg-white">
        <h2 className="text-[#083A6F] text-lg font-semibold mb-8">
          Welcome Back to Starbhak Library!
        </h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-64 text-[#083A6F] mb-4 px-4 py-2 border border-[#083A6F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#083A6F]"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-64 text-[#083A6F] mb-6 px-4 py-2 border border-[#083A6F] rounded-md focus:outline-none focus:ring-2 focus:ring-[#083A6F]"
        />

        {/* Button */}
        <Link
          href="/home"
          className="w-32 text-center shadow-md py-2.5 text-[15px] font-medium rounded-md text-white bg-[#083A6F] hover:bg-[#0A4B9A] transition"
        >
          Masuk
        </Link>

        <p className="mt-6 text-sm text-[#083A6F]">
          Belum punya akun?{" "}
          <Link href="/registerj" className="font-semibold underline hover:text-[#0A4B9A]">
            Register di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
