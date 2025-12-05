import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  res.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",     // WAJIB SAMA DENGAN LOGIN
    expires: new Date(0),
    path: "/",           //  WAJIB SAMA
  });

  return res;
}
