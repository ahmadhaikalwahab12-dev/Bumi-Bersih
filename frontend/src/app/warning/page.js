"use client";

import Image from "next/image";
import { useState } from "react";

export default function Warning() {
  const [showNotif, setShowNotif] = useState(false);

  const handleDelete = () => {
    setShowNotif(true);

    // Notifikasi hilang otomatis setelah 2 detik
    setTimeout(() => {
      setShowNotif(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex justify-center items-center py-16 px-4 relative">

      {/* NOTIFICATION POPUP */}
      {showNotif && (
        <div className="absolute top-10 bg-[#4D9A5F] text-white px-6 py-3 rounded-xl shadow-lg text-sm animate-fadeIn">
          ✅ Karya berhasil dihapus!
        </div>
      )}

      {/* CARD */}
      <div className="bg-[#6EAD75] w-full max-w-2xl rounded-3xl shadow-xl p-10 flex flex-col items-center">

        {/* ICON WARNING */}
        <div className="w-24 h-24 bg-[#E3B214] rounded-full flex items-center justify-center mb-6">
          <Image
            src="/icon/warning.svg"
            alt="Warning Icon"
            width={50}
            height={50}
            className="object-contain"
          />
        </div>

        {/* TEXT */}
        <h1 className="text-center text-2xl font-semibold text-white mb-10">
          Anda yakin ingin mengahpus fanwork ini?
        </h1>

        {/* BUTTONS */}
        <div className="flex gap-6">
          
          {/* BUTTON HAPUS */}
          <button
            onClick={handleDelete}
            className="px-10 py-3 bg-[#E3B214] hover:bg-[#cfa215] text-white font-semibold rounded-lg transition"
          >
            Hapus
          </button>

          {/* BUTTON TIDAK */}
          <button className="px-10 py-3 bg-white text-[#E3B214] font-semibold rounded-lg border border-[#E3B214] hover:bg-yellow-50 transition">
            Tidak
          </button>
        </div>
      </div>

      {/* Animation style */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
