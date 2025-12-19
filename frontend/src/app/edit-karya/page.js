"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EditKarya() {
  const router = useRouter();

  const [title, setTitle] = useState("Fana memakai baju batik");
  const [desc, setDesc] = useState(
    "Fana terlihat senang memakai baju batik untuk merayakan hari batik nasional!"
  );
  const [isAgree, setIsAgree] = useState(true);

  const handleDelete = () => {
    router.push("/warning"); // ⬅ Redirect ke halaman Warning
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex justify-center items-center py-16 px-4">
      <div className="bg-[#6EAD75] w-full max-w-2xl rounded-3xl shadow-xl p-10">

        {/* HEADER */}
        <h1 className="text-center text-4xl font-bold text-white mb-10">
          Edit <span className="text-[#E3B214]">Fanwork</span>
        </h1>

        <div className="space-y-6">

          {/* JUDUL */}
          <div>
            <label className="text-sm font-semibold text-white">Judul fanwork:</label>
            <input
              type="text"
              className="mt-2 w-full px-4 py-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#E3B214]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="text-sm font-semibold text-white">Deskripsi fanwork:</label>
            <textarea
              className="mt-2 w-full px-4 py-3 h-32 rounded-lg bg-white outline-none resize-none focus:ring-2 focus:ring-[#E3B214]"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          {/* GAMBAR */}
          <div>
            <label className="text-sm font-semibold text-white">Gambar fanwork:</label>
            <p className="text-xs text-white/80 mt-1">
              Ukuran gambar tidak dapat melebihi dari 12MB dan merupakan tipe file JPG, PNG, GIF, atau WEBP.
            </p>

            <div className="mt-3 relative border-2 border-dashed border-white rounded-xl bg-white/40 h-48 flex justify-center items-center">
              <Image
                src="/images/label.svg"
                alt="Preview"
                width={200}
                height={200}
                className="object-contain max-h-44"
              />

              {/* Upload BTN */}
              <label className="absolute bottom-3 right-3 cursor-pointer">
                <Image src="/icon/delet.svg" alt="upload" width={40} height={40} />
                <input type="file" className="hidden" />
              </label>
            </div>
          </div>

          {/* AGREEMENT */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={isAgree}
              onChange={() => setIsAgree(!isAgree)}
              className="mt-1 accent-[#E3B214]"
            />
            <p className="text-xs text-white leading-relaxed">
              Dengan melanjutkan, anda setuju dengan Kebijakan Publikasi serta{" "}
              <span className="underline cursor-pointer">Syarat dan Ketentuan</span> kami.
            </p>
          </div>

          {/* DELETE BUTTON */}
          <button
            onClick={handleDelete}
            className="w-full mt-2 bg-[#E3B214] hover:bg-[#c99b0f] text-white font-semibold py-3 rounded-lg transition shadow-md"
          >
            Delete Karya
          </button>

        </div>
      </div>
    </div>
  );
}
