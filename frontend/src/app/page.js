"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BumiBersihApp() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section 1 */}
      <section id="home" className="pt-24 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Left Text Block */}
          <div className="order-2 md:order-1">
            <div className="flex items-center space-x-2 mb-6">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="text-[#66AC6E]"> Menjadi Bersih Dimulai dari
              Diri Sendiri.</span>
              <br />
              <span className="text-[#E3B214] ">Mari  Lestarikan Bumi Pertiwi!</span> 
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Perubahan dimulai dari tindakan kecil. Dengan memilah sampah, mengurangi
              plastik sekali pakai, dan menjaga kebersihan sekitar, setiap individu dapat
              berkontribusi menciptakan lingkungan yang lebih sehat.
            </p>
          </div>

          {/* Right Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/hero-image.svg"
                width={600}
                height={600}
                alt="Bumi Bersih Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Green Divider - Full Width */}
      <div className="w-full">
        <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
      </div>

      {/* Section 2 - Image Left, Text Right */}
      <section className="pt-16 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="order-1 md:order-1 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/hero-image.svg"
                width={600}
                height={600}
                alt="Membuang Sampah"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="order-2 md:order-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="w-3 h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-3 h-3 bg-[#E3B214]  rounded-full"></span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="text-[#66AC6E]">Mari membuang</span> 
              <br />
              <span className="text-[#E3B214]">pada tempatnya</span> 
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Kedisiplinan dalam membuang sampah di tempat yang telah disediakan merupakan kebiasaan dasar yang perlu dibiasakan sejak dini.
              Langkah kecil ini dapat memberikan dampak besar terhadap kebersihan lingkungan sekitar.
            </p>
          </div>

        </div>
      </section>

      {/* Green Divider - Full Width */}
      <div className="w-full">
        <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
      </div>

      {/* Section 3 - Text Left, Image Right */}
      <section className="pt-16 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="order-2 md:order-1">
            <div className="flex items-center space-x-2 mb-6">
              <span className="w-3 h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-3 h-3 bg-[#E3B214]  rounded-full"></span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="text-[#66AC6E]">Mengurangi produksi</span> 
              <br />
              <span className="text-[#E3B214]">sampah</span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Mengurangi penggunaan plastik sekali pakai, membawa wadah pribadi, dan memilih produk ramah lingkungan merupakan 
              cara sederhana namun efektif untuk menekan jumlah sampah yang dihasilkan setiap hari.
            </p>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/hero-image.svg"
                width={600}
                height={600}
                alt="Mengurangi Sampah"
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Green Divider - Full Width */}
      <div className="w-full">
        <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
      </div>

      {/* Section 4 - Image Left, Text Right */}
      <section className="pt-16 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="order-1 md:order-1 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/hero-image.svg"
                width={600}
                height={600}
                alt="Daur Ulang"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="order-2 md:order-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="w-3 h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-3 h-3 bg-[#E3B214]  rounded-full"></span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="text-[#66AC6E]">Melakukan Daur</span>
              <br />
              <span className="text-[#E3B214]">Ulang Sampah</span> 
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Sampah yang masih bisa dimanfaatkan sebaiknya diolah kembali menjadi produk baru. Selain membantu mengurangi volume sampah,       
              kegiatan ini juga dapat menjadi bentuk kreativitas dan kepedulian terhadap lingkungan.
            </p>
          </div>

        </div>
      </section>

      {/* Green Divider - Full Width */}
      <div className="w-full">
        <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
      </div>

      {/* Section 5 - Text Left, Image Right */}
      <section className="pt-16 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="order-2 md:order-1">
            <div className="flex items-center space-x-2 mb-6">
              <span className="w-3 h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-3 h-3 bg-[#E3B214]  rounded-full"></span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="text-[#66AC6E]">Memanfaatkan</span> 
              <br />
              <span className="text-[#E3B214] ">Barang-Barang</span> 
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Kegiatan sosialisasi dan penyuluhan menjadi langkah penting untuk menumbuhkan kepedulian terhadap lingkungan. Melalui ajakan yang berkelanjutan, 
              masyarakat diharapkan semakin memahami pentingnya menjaga kebersihan bersama.
            </p>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/hero-image.svg"
                width={600}
                height={600}
                alt="Memanfaatkan Barang"
                className="w-full h-auto"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Green Divider - Full Width */}
      <div className="w-full">
        <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
      </div>

      {/* Section 6 - Image Left, Text Right */}
      <section className="pt-16 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="order-1 md:order-1 flex justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/hero-image.svg"
                width={600}
                height={600}
                alt="Operasi Semut"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="order-2 md:order-2">
            <div className="flex items-center space-x-2 mb-6">
              <span className="w-3 h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-3 h-3 bg-[#E3B214]  rounded-full"></span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              <span className="text-[#66AC6E]">Mengikuti Program</span> 
              <br />
              <span className="text-[#E3B214] ">&quot;Operasi Semut&quot;</span> 
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Kegiatan gotong royong seperti Operasi Semut dapat menjadi sarana membangun kebersamaan sekaligus meningkatkan rasa tanggung jawab 
              terhadap lingkungan sekitar.
            </p>
          </div>

        </div>
      </section>

      {/* Maskot Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <div className="bg-[#66AC6E] rounded-[50px] shadow-2xl overflow-visible ml-0 md:ml-32">
              <div className="flex items-center py-8 md:py-12 pl-8 md:pl-40 pr-8 md:pr-12">

                <div className="flex-1">
                  <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
                    Menyukai <span className="text-[#E3B214] ">Maskot</span> Kami?
                  </h2>
                  <p className="text-base md:text-lg text-white leading-relaxed max-w-2xl">
                    Kunjungi halaman fanwork kami untuk melihat hasil karya sobat Bumi Bersih lainnya,
                    atau ikut serta mengupload karyamu dan bantu sebarkan kesadaran isu lingkungan.
                  </p>
                </div>

                <div className="hidden md:flex flex-col items-end gap-3 ml-8">
                  <div className="flex gap-2 mr-2">
                    <span className="w-3 h-3 bg-white rounded-full"></span>
                    <span className="w-3 h-3 bg-[#E3B214]  rounded-full"></span>
                  </div>

                  <Link href="/fanwork">
                    <button className="bg-[#E3B214] hover:bg-yellow-300 text-white px-10 py-4 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-xl whitespace-nowrap active:scale-95">
                      Lihat Fanwork
                    </button>
                  </Link>
                </div>
              </div>

              <div className="md:hidden px-8 pb-8">
                <Link href="/fanwork">
                  <button className="bg-[#E3B214] hover:bg-yellow-300 text-white px-8 py-3 rounded-full font-bold w-full transition-all duration-300 hover:scale-105 shadow-lg active:scale-95">
                    Lihat Fanwork
                  </button>
                </Link>
              </div>
            </div>

            {/* Maskot Image Placeholder */}
            <div className="absolute -left-4 md:-left-8 top-1/2 -translate-y-1/2 z-10">
              <div className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-[#66AC6E] p-2 shadow-2xl">
                <div className="w-full h-full rounded-full border-8 border-[#E3B214] bg-white flex items-center justify-center">
                  <span className="text-gray-400 text-xs md:text-sm">Image Placeholder</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <span className="w-3 h-3 bg-[#66AC6E] rounded-full"></span>
              <span className="w-3 h-3 bg-[#E3B214] rounded-full"></span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#66AC6E] mb-6">
              Apa yang Bisa <span className="text-yellow-500">Kamu</span>{" "}
              <span className="text-[#66AC6E]">Lakukan?</span>
            </h2>

            <p className="text-[#66AC6E] text-lg mb-8 max-w-2xl mx-auto">
              Pelajari berbagai langkah sederhana yang bisa kamu mulai sekarang
              untuk menjaga kebersihan lingkungan dan memberi dampak nyata di sekitarmu.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/what-to-do">
                <button className="bg-[#66AC6E] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
                  What To Do
                </button>
              </Link>
              <Link href="/zero-waste-lifestyle">
                <button className="bg-[#66AC6E] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
                  Zero Waste Lifestyle
                </button>
              </Link>
              <Link href="/recycle-bay">
                <button className="bg-[#66AC6E] text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
                  Recycle Bay
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}