"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import QuizCard from "../components/QuizCard";
import UploadFanwork from "../components/UploadFanwork";

export default function Fanwork() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const toggleExpand = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  return (
    <div className="min-h-screen">
      {/* HERO SECTION 1 */}
      <section id="fanwork" className="pt-28 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#66AC6E] rounded-3xl shadow-xl p-8 md:p-12 text-white">
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Fan<span className="text-yellow-400">work</span>
              </h1>
              <div className="flex items-end space-x-2">
                <span className="w-4 h-4 bg-white rounded-full"></span>
                <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-4 font-bold">
              Ayo ekspresikan kreativitas serta dukunganmu terhadap website Bumi
              Bersih dengan membuat sebuah karya
            </p>

            <p className="text-lg leading-relaxed mb-4">
              yang terinspirasi dari maskot kami, yaitu Fora dan Fana! Tunjukkan
              imajinasimu melalui gambar, ilustrasi, atau kerajinan unik
              lainnya, dan jadilah bagian dari gerakan untuk menjaga bumi tetap
              bersih dan lestari.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Upload Button */}
          <div className="mx-8 mb-8 max-w-full flex justify-center items-end h-[526px] bg-[url(/images/img_plc.svg)]">
            <div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="mb-12 bg-[#E3B214] hover:bg-yellow-500 text-white font-bold py-3 px-12 rounded-full transition-all hover:scale-105 shadow-lg"
              >
                Upload Karyamu!
              </button>
            </div>
          </div>

          {/* Gallery Grid */}
          <QuizCard />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
            <div className="flex justify-center items-center space-x-2 mb-6">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Apa yang Bisa <span className="text-yellow-500">Kamu</span>{" "}
              <span className="text-green-600">Lakukan?</span>
            </h2>

            <p className="text-[#66AC6E] text-lg mb-8 max-w-2xl mx-auto">
              Pelajari berbagai langkah sederhana yang bisa kamu mulai sekarang
              untuk menjaga kebersihan lingkungan dan memberi dampak nyata di
              sekitarmu.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/what-to-do">
                <button className="bg-[#66AC6E]  text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
                  What To Do
                </button>
              </Link>
              <Link href="/zero-waste-lifestyle">
                <button className="bg-[#66AC6E]  text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
                  Zero Waste Lifestyle
                </button>
              </Link>
              <Link href="/recycle-bay">
                <button className="bg-[#66AC6E]  text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all hover:scale-105 shadow-lg">
                  Recycle Bay
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
            {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowUploadModal(false)}
          />

          {/* Modal */}
          <div className="relative z-50 bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <UploadFanwork onSuccess={() => setShowUploadModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

