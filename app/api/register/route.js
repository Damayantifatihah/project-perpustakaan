import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { namaLengkap, email, kelasJurusan, telepon, password } = await req.json();

    if (!namaLengkap || !email || !password) {
      return NextResponse.json(
        { error: "Data tidak lengkap!" },
        { status: 400 }
      );
    }

    const [existing] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email sudah terdaftar!" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users 
        (namaLengkap, email, kelasJurusan, telepon, password, role) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        namaLengkap,
        email,
        kelasJurusan || null,
        telepon || null,
        hashedPassword,
        "siswa",
      ]
    );

    return NextResponse.json(
      { message: "Registrasi berhasil!" },
      { status: 201 }
    );

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
