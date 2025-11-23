import Image from "next/image"; 
import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header atas */}
      <div className="bg-[#0a4e75] text-white text-sm">
        <div className="max-w-7xl mx-auto flex items-center text-lg gap-8 px-6 py-2">
          <div className="flex items-center gap-2">
            <span>📧</span>
            <span>taruna@smktarunabhakti.net</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📞</span>
            <span>(021) 8744810</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Starbhak Library"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-semibold text-[#0a4e75]">LitSpace</h1>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex items-center gap-8 text-gray-700 font-semibold">
            <a href="#beranda" className="hover:text-[#0a4e75] transition">Beranda</a>
            <a href="#tentang" className="hover:text-[#0a4e75] transition">Tentang</a>
            <a href="#pustakawan" className="hover:text-[#0a4e75] transition">Pustakawan</a>
            <a href="#kontak" className="hover:text-[#0a4e75] transition">Kontak</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="relative w-full h-[500px] overflow-hidden">
        <img
          src="/logo TEBE.jpg"
          alt="Background Sekolah"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45"></div>

        {/* Text */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
            Selamat Datang di<br />
            Perpustakaan SMK Taruna Bhakti
          </h2>
          <p className="text-white text-lg md:text-xl mb-6 max-w-2xl drop-shadow-md">
            Pusat literasi dan sumber belajar untuk masa depan yang lebih cerah
          </p>

          <div className="flex gap-4 mt-6">
            <Link href="/auth/register">
              <button className="bg-[#0a4e75] text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-[#093d5a] transition">
                Ayo Mulai
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang Kami Section */}
      <section id="tentang" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between bg-[#f5f8fc] rounded-2xl shadow-lg px-8 md:px-14 py-12 md:py-16">
            {/* Text Section */}
            <div className="max-w-lg">
              <h3 className="text-3xl md:text-4xl font-bold text-[#0a4e75] mb-6 leading-snug">
                Kami Adalah<br />
                Perpustakaan SMK Taruna Bhakti Depok
              </h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Kami adalah Perpustakaan SMK Taruna Bhakti Depok, pusat sumber belajar
                yang mendukung kegiatan akademik dan pengembangan literasi digital bagi
                seluruh warga sekolah.
              </p>
            </div>

            {/* Image Section */}
            <div className="mt-8 md:mt-0 md:ml-8 flex-shrink-0">
              <Image
                src="/icon 2.png"
                alt="Ilustrasi membaca"
                width={360}
                height={360}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <h2 className="text-3xl font-bold text-[#0a4e75] mb-10 text-center">
            Visi dan Misi
          </h2>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h3 className="font-semibold text-2xl text-[#0a4e75] mb-4">
              Visi Perpustakaan SMK Taruna Bhakti Depok
            </h3>
            <p className="text-gray-700 italic text-lg leading-relaxed border-l-4 border-[#0a4e75] pl-6 py-2">
              "Menjadi pusat literasi digital yang inovatif, inspiratif, dan mendukung terciptanya 
              budaya membaca di lingkungan SMK Taruna Bhakti Depok."
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="font-semibold text-[#0a4e75] text-2xl mb-6">
              Misi Perpustakaan SMK Taruna Bhakti Depok
            </h3>
            <ol className="list-decimal list-inside text-lg text-gray-700 leading-relaxed space-y-3">
              <li>Menyediakan koleksi bahan pustaka yang relevan, mutakhir, dan berkualitas.</li>
              <li>Mengembangkan layanan perpustakaan berbasis teknologi informasi.</li>
              <li>Meningkatkan minat baca dan literasi digital siswa.</li>
              <li>Menciptakan lingkungan perpustakaan yang nyaman dan modern.</li>
              <li>Mendorong siswa aktif dalam pengelolaan perpustakaan.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Admin */}
      <section id="pustakawan" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0a4e75] mb-10 text-center">
            Admin Perpustakaan
          </h2>

          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm">
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src="/admin.png"
                  alt="Admin Perpustakaan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-[#0a4e75] mb-2">
                  Pustakawan SMK Taruna Bhakti
                </h3>
                <p className="text-gray-600">Siap melayani kebutuhan literasi Anda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="py-20 bg-[#f5f8fc]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0a4e75] mb-12 text-center">
            Hubungi Kami
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:shadow-lg transition">
              <div className="text-[#0a4e75] text-4xl mb-4">📞</div>
              <h3 className="text-[#0a4e75] font-semibold text-lg mb-3">Telepon</h3>
              <p className="text-gray-700 text-base">(021) 8744810</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:shadow-lg transition">
              <div className="text-[#0a4e75] text-4xl mb-4">🕒</div>
              <h3 className="text-[#0a4e75] font-semibold text-lg mb-3">Jam Operasional</h3>
              <p className="text-gray-700 text-base text-center">
                Senin–Jumat: 07.30–16.00<br />
                Sabtu: 07.30–12.30
              </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center hover:shadow-lg transition">
              <div className="text-[#0a4e75] text-4xl mb-4">📍</div>
              <h3 className="text-[#0a4e75] font-semibold text-lg mb-3">Alamat</h3>
              <p className="text-gray-700 text-base text-center leading-relaxed">
                Jln. Pekapuran Kel. Curug,<br />
                Kec. Cimanggis Depok
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-8 border-b border-gray-700">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <img
                src="/logo.png"
                alt="LitSpace Logo"
                className="w-12 h-12 object-contain"
              />
              <h3 className="text-2xl font-bold">LitSpace</h3>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4">

              <a
                href="https://www.instagram.com/starbhak.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 flex items-center justify-center transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Section - Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Useful Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Useful Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#beranda" className="text-gray-400 hover:text-white transition">Beranda</a>
                </li>
                <li>
                  <a href="#tentang" className="text-gray-400 hover:text-white transition">Tentang Kami</a>
                </li>
                <li>
                  <a href="#pustakawan" className="text-gray-400 hover:text-white transition">Pustakawan</a>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Information</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">Tentang Kami</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">Syarat & Ketentuan</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">Kebijakan Privasi</a>
                </li>
                <li>
                  <a href="#kontak" className="text-gray-400 hover:text-white transition">Kontak</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition">Dokumentasi</a>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Tentang LitSpace</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Perpustakaan SMK Taruna Bhakti Depok - Pusat literasi digital yang mendukung 
                pengembangan akademik dan budaya membaca untuk masa depan yang lebih cerah.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Perpustakaan LitSpace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}