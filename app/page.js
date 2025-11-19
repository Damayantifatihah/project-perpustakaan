import Image from "next/image"; 
import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white">

      {/* Header atas */}
      <div className="bg-[#0a4e75] text-white text-sm">
        <div className="mx-auto flex items-center text-1g gap-8 px-6 py-2">
          <div className="flex items-center gap-2">
            <span>📧</span>
            <span>taruna@smktarunabhakti.net</span>
          </div>
          <div className="gap-2">
            <span>📞</span>
            <span>(021) 8744810</span>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex justify-between items-center px-6 py-4">

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
            <a href="#beranda" className="hover:text-[#0a4e75]">Beranda</a>
            <a href="#tentang" className="hover:text-[#0a4e75]">Tentang</a>
            <a href="#pustakawan" className="hover:text-[#0a4e75]">Pustakawan</a>
            <a href="#kontak" className="hover:text-[#0a4e75]">Kontak</a>
          </nav>
        </div>
      </header>

    
      <section id="beranda" className="relative w-full h-[500px] mb-50 overflow-hidden">
        <img
          src="/logo TEBE.jpg"
          alt="Background Sekolah"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/45"></div>

        {/* TEXT */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Selamat Datang di  <br />
            Perpustakaan SMK Taruna Bhakti
          </h2>

          <div className="flex gap-4 mt-6">
            <Link href="/auth/register">
              <button className="bg-[#0a4e75] text-white font-semibold py-2 px-5 rounded-md shadow hover:bg-[#093d5a] transition">
                Ayo Mulai
              </button>
            </Link>
          </div>
        </div>

      </section>

      {/* Tentang Kami Section */}
      <section id="tentang" className="flex justify-center mb-50 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl bg-[#f5f8fc] rounded-2xl shadow px-14 py-16">

          {/* Text Section */}
          <div className="max-w-lg">
            <h3 className="text-3xl font-bold text-[#0a4e75] mb-6 leading-snug">
              Kami Adalah <br />
              Perpustakaan SMK Taruna Bhakti Depok
            </h3>
            <p className="text-gray-700 text-base leading-relaxed">
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
      </section>

      {/* Visi Misi */}
      <section className="py-16 bg-white">
        <div className="w-full max-w-5xl px-6 md:px-10">
          <h2 className="text-2xl font-semibold text-[#0a4e75] underline mb-6">
            Visi dan Misi Starbhak Library
          </h2>

          <div className="mb-10">
            <h3 className="font-semibold text-2xl text-[#0a4e75] mb-6">
              Visi Perpustakaan SMK Taruna Bhakti Depok :
            </h3>
            <p className="text-gray-700 italic text-xl leading-relaxed border-l-4 border-[#0a4e75] pl-4">
              “Menjadi pusat literasi digital yang inovatif, inspiratif, dan mendukung terciptanya 
              budaya membaca di lingkungan SMK Taruna Bhakti Depok.”
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#0a4e75] text-2xl mb-6 py-4">
              Misi Perpustakaan SMK Taruna Bhakti Depok :
            </h3>
            <ol className="list-decimal list-inside text-xl text-gray-700 leading-relaxed space-y-2">
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
      <section id="pustakawan" className="flex flex-col items-center justify-center py-16 bg-white">
        <h2 className="text-lg md:text-xl font-semibold text-[#0a4e75] mb-6">Admin Perpustakaan</h2>

        <div className="w-50 h-60 mb-20 bg-gray-300 rounded-md flex items-center justify-center overflow-hidden shadow-sm">
          <img
            src="/admin.png"
            alt="Admin Perpustakaan"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Kontak */}
      <section id="kontak" className="py-16 bg-[#f5f8fc]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0a4e75] mb-10">
            Hubungi Kami
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center">
              <div className="text-[#0a4e75] text-3xl mb-3">📞</div>
              <h3 className="text-[#0a4e75] font-semibold mb-2">Telepon</h3>
              <p className="text-gray-700 text-sm">(021) 8744810</p>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center">
              <div className="text-[#0a4e75] text-3xl mb-3">🕒</div>
              <h3 className="text-[#0a4e75] font-semibold mb-2">Jam Operasional</h3>
              <p className="text-gray-700 text-sm">
                Senin–Jumat : 07.30–16.00 <br />
                Sabtu : 07.30–12.30
              </p>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center">
              <div className="text-[#0a4e75] text-3xl mb-3">📍</div>
              <h3 className="text-[#0a4e75] font-semibold mb-2">Alamat</h3>
              <p className="text-gray-700 text-sm text-center leading-relaxed">
                Jln. Pekapuran Kel. Curug, <br />
                Kec. Cimanggis Depok.
              </p>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
