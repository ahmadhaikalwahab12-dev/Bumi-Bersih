// components/QuizGrid.jsx
'use client';

import { useState } from 'react';
import { Heart, MessageCircle, X } from 'lucide-react';
import Image from 'next/image';

function QuizCard({ username, likes: initialLikes, title, description }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [comment, setComment] = useState('');

  const toggleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition-all hover:shadow-2xl">
        {/* Header Hijau */}
        <div className="bg-[#66AC6E] text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/30 rounded-full"></div>
            <span className="font-semibold">{username}</span>
          </div>
          <button
            onClick={toggleLike}
            className="flex items-center gap-2 hover:scale-110 transition"
          >
            <Heart size={24} className={isLiked ? 'fill-red-500 text-red-500' : 'text-white'} />
            <span className="text-lg font-medium">{likes}</span>
          </button>
        </div>

        {/* Gambar + Icon Zoom Custom */}
        <div className="relative cursor-pointer" onClick={() => setIsZoomOpen(true)}>
          <div className="bg-gray-100 w-full h-64 flex items-center justify-center">
            <span className="text-gray-400 text-lg">Image Placeholder</span>
          </div>

          {/* Ikon Union SVG Custom (pastikan file ada di public/icon/icon_union.svg) */}
          <div className="absolute top-3 right-3 bg-[#66AC6E] hover:bg-[#5a9a61] rounded-[10px] p-2.5 shadow-lg transition hover:scale-110">
            <Image src="/icon/icon_union.svg" width="18" height="18" alt="zoom" />
          </div>

          <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all pointer-events-none"></div>
        </div>

        {/* Konten */}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-[#66AC6E] mb-3">{title}</h3>
          <p className="text-[#66AC6E] mb-6 flex-grow">{description}</p>

          <button
            onClick={() => setIsCommentOpen(true)}
            className="w-full bg-gray-100 hover:bg-gray-200 rounded-lg py-3 flex items-center justify-center gap-2 text-gray-700 font-medium transition"
          >
            <MessageCircle size={20} />
            Komentar
          </button>
        </div>
      </div>

      {/* ZOOM MODAL */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative w-full h-full max-w-5xl max-h-screen">
            <div className="bg-gray-300 rounded-2xl w-full h-full flex items-center justify-center shadow-2xl">
              <span className="text-white text-4xl font-bold drop-shadow-lg">
                GAMBAR ZOOM
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomOpen(false);
              }}
              className="absolute -top-12 right-0 bg-white rounded-full p-3 shadow-2xl hover:bg-gray-100"
            >
              <X size={30} className="text-[#66AC6E]" />
            </button>
          </div>
        </div>
      )}

      {/* KOMENTAR MODAL */}
      {isCommentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center p-5 border-b">
              <h3 className="text-lg font-bold">Tulis Komentar</h3>
              <button onClick={() => setIsCommentOpen(false)}>
                <X size={26} className="text-gray-500" />
              </button>
            </div>
            <div className="p-5">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tulis komentar kamu..."
                className="w-full p-4 border rounded-xl resize-none focus:outline-none focus:ring-4 focus:ring-[#66AC6E]"
                rows={5}
              />
            </div>
            <div className="flex justify-end gap-3 p-5 border-t">
              <button
                onClick={() => setIsCommentOpen(false)}
                className="px-6 py-2.5 text-[#66AC6E] hover:bg-[#66AC6E] rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (comment.trim()) alert('Komentar terkirim: ' + comment);
                  setComment('');
                  setIsCommentOpen(false);
                }}
                className="px-6 py-2.5 bg-[#66AC6E] text-white rounded-lg hover:bg-[#5a9a61] font-medium"
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function QuizGrid() {
  const dataQuiz = [
    { username: "Zeanal24", likes: 12, title: "Flora Pendaur Ulang Handal", description: "Flora sedang mendaur ulang berbagai barang bekas dan mengubahnya menjadi kerajinan tangan yang berguna. Dengan penuh ketelitian, ia memilah material yang sudah tidak terpakai, kemudian menyusunnya kembali menjadi benda baru yang fungsional dan indah." },
    { username: "RaniCantik", likes: 87, title: "Flora Pendaur Ulang Handal", description: "Flora sedang mendaur ulang berbagai barang bekas dan mengubahnya menjadi kerajinan tangan yang berguna. Dengan penuh ketelitian, ia memilah material yang sudah tidak terpakai, kemudian menyusunnya kembali menjadi benda baru yang fungsional dan indah." },
    { username: "GamerPro99", likes: 203, title: "Flora Pendaur Ulang Handal", description: "Flora sedang mendaur ulang berbagai barang bekas dan mengubahnya menjadi kerajinan tangan yang berguna. Dengan penuh ketelitian, ia memilah material yang sudah tidak terpakai, kemudian menyusunnya kembali menjadi benda baru yang fungsional dan indah." },
    { username: "MakanEnak", likes: 145, title: "Flora Pendaur Ulang Handal", description: "Flora sedang mendaur ulang berbagai barang bekas dan mengubahnya menjadi kerajinan tangan yang berguna. Dengan penuh ketelitian, ia memilah material yang sudah tidak terpakai, kemudian menyusunnya kembali menjadi benda baru yang fungsional dan indah." },
    { username: "LalaCute", likes: 98, title: "Flora Pendaur Ulang Handal", description: "Flora sedang mendaur ulang berbagai barang bekas dan mengubahnya menjadi kerajinan tangan yang berguna. Dengan penuh ketelitian, ia memilah material yang sudah tidak terpakai, kemudian menyusunnya kembali menjadi benda baru yang fungsional dan indah." },
    { username: "BudiGanteng", likes: 312, title: "Flora Pendaur Ulang Handal", description: "Flora sedang mendaur ulang berbagai barang bekas dan mengubahnya menjadi kerajinan tangan yang berguna. Dengan penuh ketelitian, ia memilah material yang sudah tidak terpakai, kemudian menyusunnya kembali menjadi benda baru yang fungsional dan indah." },
    { username: "NaylaGemes", likes: 67, title: "Flora Pendaur Ulang Handal", description: "Flora sedang mendaur ulang berbagai barang bekas dan mengubahnya menjadi kerajinan tangan yang berguna. Dengan penuh ketelitian, ia memilah material yang sudah tidak terpakai, kemudian menyusunnya kembali menjadi benda baru yang fungsional dan indah." },
    { username: "FajarCeria", likes: 189, title: "Flora Pendaur Ulang Handal", description: "Flora sedang mendaur ulang berbagai barang bekas dan mengubahnya menjadi kerajinan tangan yang berguna. Dengan penuh ketelitian, ia memilah material yang sudah tidak terpakai, kemudian menyusunnya kembali menjadi benda baru yang fungsional dan indah.?" },
    { username: "SalsaDancer", likes: 94, title: "Flora Pendaur Ulang Handal", description: "Flora sedang mendaur ulang berbagai barang bekas dan mengubahnya menjadi kerajinan tangan yang berguna. Dengan penuh ketelitian, ia memilah material yang sudah tidak terpakai, kemudian menyusunnya kembali menjadi benda baru yang fungsional dan indah." },
  ];

  return (
    <div className="min-h-screen py-12 px-4">

      {/* Grid 3 Kolom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {dataQuiz.map((item, index) => (
          <QuizCard
            key={index}
            username={item.username}
            likes={item.likes}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}