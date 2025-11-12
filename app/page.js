import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-white">
     {/* Header atas */}
    <div className="bg-[#0a4e75] text-white text-sm">
    <div className=" mx-auto flex items-center text-1g gap-8 px-6 py-2">
        <div className="flex items-center gap-2">
        <span>📧</span>
        <span>taruna@smktarunabhakti.net</span>
        </div>
        <div className=" gap-2">
        <span>📞</span>
        <span>(021) 8744810</span>
        </div>
    </div>
    </div>


      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className=" mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Starbhak Library"
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-3xl font-semibold text-[#0a4e75]">
                LitSpace
              </h1>
              {/* <p className="text-sm text-gray-500 -mt-1">CuyPerpus</p> */}
            </div>
          </div>

          {/* Menu */}
          <nav className="flex items-center gap-8 text-gray-700 font-semibold">
            <a href="#" className="hover:text-[#0a4e75]">Beranda</a>
            <a href="#" className="hover:text-[#0a4e75]">Tentang</a>
            <a href="#" className="hover:text-[#0a4e75]">Pustakawan</a>
            <a href="#" className="hover:text-[#0a4e75]">Kontak</a>
          </nav>
        </div>
      </header>


      {/* Hero Section */}
<section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-[#f5f8fc]">
  {/* Text Section */}
  <div className="max-w-md">
    <h2 className="text-2xl md:text-3xl font-bold text-[#0a4e75] mb-4">
      Selamat Datang di Portal <br />
      Perpustakaan SMK Taruna Bhakti
    </h2>
    <div className="flex gap-4 mt-6">
      <Link href="/login">
        <button className="bg-[#0a4e75] text-white font-semibold py-2 px-5 rounded-md shadow hover:bg-[#093d5a] transition">
          Akses Petugas
        </button>
      </Link>
      <Link href="/register">
        <button className="bg-[#0a4e75] text-white font-semibold py-2 px-5 rounded-md shadow hover:bg-[#093d5a] transition">
          Akses Siswa
        </button>
      </Link>
    </div>
  </div>

  {/* Image Section */}
  <div className="mt-8 md:mt-0">
    <Image
      src="/icon 1.png" // ganti dengan file kamu, misal yang kamu upload
      alt="Ilustrasi perpustakaan"
      width={400}
      height={400}
      className="object-contain"
    />
  </div>
</section>


      

     {/* Tentang Kami Section */}
<section className="flex justify-center py-12 bg-white">
  <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl bg-[#f5f8fc] rounded-xl shadow-sm px-8 py-10">
    
    {/* Text Section */}
    <div className="max-w-lg">
      <h3 className="text-2xl font-bold text-[#0a4e75] mb-4 leading-snug">
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
        width={300}
        height={300}
        className="object-contain"
      />
    </div>
  </div>
</section>


{/* Visi dan Misi Section */}
<section className=" py-16 bg-white">
  <div className="w-full max-w-5xl px-6 md:px-10">
    <h2 className="text-xl font-semibold text-[#0a4e75] underline mb-6">
      Visi dan Misi Starbhak Library
    </h2>

    {/* Visi */}
    <div className="mb-8">
      <h3 className="font-semibold text-[#0a4e75] mb-2">
        Visi Perpustakaan SMK Taruna Bhakti Depok :
      </h3>
      <p className="text-gray-700 italic leading-relaxed border-l-4 border-[#0a4e75] pl-4">
        “Menjadi pusat literasi digital yang inovatif, inspiratif, dan mendukung terciptanya 
        budaya membaca di lingkungan SMK Taruna Bhakti Depok.”
      </p>
    </div>

    {/* Misi */}
    <div>
      <h3 className="font-semibold text-[#0a4e75] mb-3 py-4">
        Misi Perpustakaan SMK Taruna Bhakti Depok :
      </h3>
      <ol className="list-decimal list-inside text-gray-700 leading-relaxed space-y-2">
        <li>Menyediakan koleksi bahan pustaka yang relevan, mutakhir, dan berkualitas untuk mendukung proses belajar mengajar.</li>
        <li>Mengembangkan layanan perpustakaan berbasis teknologi informasi agar mudah diakses oleh seluruh warga sekolah.</li>
        <li>Meningkatkan minat baca dan kemampuan literasi digital siswa melalui berbagai program dan kegiatan literasi.</li>
        <li>Menciptakan lingkungan perpustakaan yang nyaman, modern, dan ramah pengguna.</li>
        <li>Mendorong siswa untuk berperan aktif dalam pengelolaan dan pengembangan perpustakaan sebagai wadah belajar bersama.</li>
      </ol>
    </div>
  </div>
</section>

{/* Admin Perpustakaan Section */}
<section className="flex flex-col items-center justify-center py-16 bg-white">
  <h2 className="text-lg md:text-xl font-semibold text-[#0a4e75] mb-6">
    Admin Perpustakaan
  </h2>

  {/* Foto Admin */}
  <div className="w-48 h-56 bg-gray-300 rounded-md flex items-center justify-center overflow-hidden shadow-sm">
    {/* Ganti src berikut dengan foto admin asli */}
    <img
      src="/admin.png"
      alt="Admin Perpustakaan"
      className="w-full h-full object-cover"
    />
  </div>
</section>

{/* Hubungi Kami Section */}
<section className="py-16 bg-[#f5f8fc]">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-xl md:text-2xl font-semibold text-[#0a4e75] mb-10">
      Hubungi Kami
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Telepon */}
      <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center">
        <div className="text-[#0a4e75] text-3xl mb-3">📞</div>
        <h3 className="text-[#0a4e75] font-semibold mb-2">Telepon</h3>
        <p className="text-gray-700 text-sm">(021) 8744810</p>
      </div>

      {/* Jam Operasional */}
      <div className="bg-white shadow-sm rounded-xl p-6 flex flex-col items-center">
        <div className="text-[#0a4e75] text-3xl mb-3">🕒</div>
        <h3 className="text-[#0a4e75] font-semibold mb-2">Jam Operasional</h3>
        <p className="text-gray-700 text-sm">
          Senin–Jumat : 07.30–16.00 <br />
          Sabtu : 07.30–12.30
        </p>
      </div>

      {/* Alamat */}
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
