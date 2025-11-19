// "use client";

// import Image from "next/image";
// import Link from "next/link";

// export default function Detail() {
//   const book = {
//     title: "Hans",
//     author: "Risa Saraswati",
//     publisher: "Bukune",
//     year: 2016,
//     category: "Fiksi",
//     stock: 4,
//     image: "/hans.jpg", // pastikan gambar ada di folder /public
//     description:
//       "Buku ini menceritakan kisah Hans, arwah anak Belanda yang menjadi salah satu sahabat gaib Risa. Melalui cerita ini, Risa mengungkap masa lalu Hans yang menyedihkan dan penuh misteri. 'Hans' tidak hanya menghadirkan kisah horor, tetapi juga menyentuh sisi kemanusiaan dan persahabatan antara dua dunia.",
//   };

//   return (
//     <div className="min-h-screen bg-[#E8F7F0] p-10">
//       {/* Navigasi */}
//       <div className="flex gap-10 text-lg font-semibold text-[#0a4e75] mb-10">
//         <span className="border-b-4 border-[#0a4e75] pb-2 cursor-pointer">
//           Detail Buku
//         </span>
//         <Link
//           href="/user/home"
//           className="hover:text-[#085d99] transition-colors"
//         >
//           Daftar Buku
//         </Link>
//       </div>

//       {/* Konten Buku */}
//       <div className="flex flex-col lg:flex-row items-start gap-10 bg-white p-8 rounded-xl shadow-md">
//         <Image
//           src={book.image}
//           alt={book.title}
//           width={200}
//           height={300}
//           className="rounded-md object-cover shadow-md"
//         />

//         <div className="flex-1">
//           <h2 className="text-xl font-bold text-[#0a4e75] mb-3">Deskripsi</h2>
//           <p className="text-gray-700 leading-relaxed">{book.description}</p>

//           {/* Info Buku */}
//           <div className="mt-8 overflow-x-auto">
//             <table className="w-full border-collapse text-center">
//               <thead>
//                 <tr className="bg-yellow-400 text-[#0a4e75] font-semibold text-md">
//                   <th className="py-3 px-4 rounded-tl-lg">Pengarang</th>
//                   <th className="py-3 px-4">Penerbit</th>
//                   <th className="py-3 px-4">Tahun Terbit</th>
//                   <th className="py-3 px-4">Kategori</th>
//                   <th className="py-3 px-4 rounded-tr-lg">Stok</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="bg-white text-gray-700">
//                   <td className="py-3 px-4">{book.author}</td>
//                   <td className="py-3 px-4">{book.publisher}</td>
//                   <td className="py-3 px-4">{book.year}</td>
//                   <td className="py-3 px-4">{book.category}</td>
//                   <td className="py-3 px-4">{book.stock}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           {/* Tombol Pinjam */}
//           <div className="flex justify-end mt-6">
//             <button className="bg-green-600 text-white px-6 py-2 rounded-md font-medium hover:bg-green-700 transition">
//               Pinjam
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
