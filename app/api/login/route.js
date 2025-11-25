import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi!" },
        { status: 400 }
      );
    }

    // Cek user berdasarkan email
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Email tidak ditemukan!" },
        { status: 404 }
      );
    }

    const user = rows[0];

    // Cek password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Password salah!" },
        { status: 401 }
      );
    }

    // Kirim data user lengkap ke FE
    return NextResponse.json({
      message: "Login berhasil!",
      user: {
        id: user.id,
        namaLengkap: user.namaLengkap || "",
        kelasJurusan: user.kelasJurusan || "",
        telepon: user.telepon || "",
        email: user.email,
        role: user.role || "siswa",
      },
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
