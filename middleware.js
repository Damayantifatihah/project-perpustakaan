import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const path = req.nextUrl.pathname; // buat ngecek lagi di halaman apa

  const isLoginPage = path.startsWith("/auth"); 

  // Halaman yang butuh login
  const isProtected =
    path.startsWith("/user") ||
    path.startsWith("/admin");
  
  //   PAKSA ke login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Jika SUDAH login tapi buka halaman login
  if (token && isLoginPage) {
       return NextResponse.redirect(new URL("/user/home", req.url));
  }


  return NextResponse.next(); //
}

// middle ware hanya berlaku untuk halaman 
export const config = {
  matcher: [
    "/user/:path*",
    "/admin/:path*",
    "/auth/:path*",
  ],
};

