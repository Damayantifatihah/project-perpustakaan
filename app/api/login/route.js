import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi!" },
        { status: 400 }
      );
    }

    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const user = rows[0];

    const cocok = await bcrypt.compare(password, user.password);

    if (!cocok) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "SUPER_SECRET",
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login berhasil",
      userId: user.id,
      role: user.role,
      token: token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",     // 🔥 FIX DISINI
      maxAge: 60 * 60 * 24,
      path: "/",           // HARUS SAMA DENGAN LOGOUT
    });

    return response;
  } catch (err) {
    console.error("ERROR LOGIN:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
