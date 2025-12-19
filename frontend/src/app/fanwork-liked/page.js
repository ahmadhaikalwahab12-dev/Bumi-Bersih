"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown, Heart, User, LogOut } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";


// =======================
// MAIN PAGE - LIKED FANWORK
// =======================
export default function FanworkLiked() {
  const [expandedCards, setExpandedCards] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [likedWorks, setLikedWorks] = useState([
    {
      id: 1,
      username: "Verdinanda56",
      profileImg: null,
      likes: 12,
      image: null,
      title: "Fana Memakai Baju Batik",
      description: "Fana terlihat senang memakai baju batik untuk merayakan hari batik nasional!",
      fullDescription: "Fana terlihat senang memakai baju batik untuk merayakan hari batik nasional! Dia sangat antusias mengenakan pakaian tradisional Indonesia ini dan memamerkannya kepada teman-temannya.",
      comments: []
    },
    {
      id: 2,
      username: "Zaenur24",
      profileImg: null,
      likes: 18,
      image: null,
      title: "Flora Pendaki Line Handal",
      description: "Flora selalu bersemangat saat berburu di Hutan yang menguras habisnya tenaga dan tenaga untuk menjelajah dunia luar.",
      fullDescription: "Flora selalu bersemangat saat berburu di Hutan yang menguras habisnya tenaga dan tenaga untuk menjelajah dunia luar. Sangat suka penggambaran watak Flora yang sangat kuat pada komik ini. Alam luar jadi terasa",
      comments: []
    },
    {
      id: 3,
      username: "Zaenur24",
      profileImg: null,
      likes: 15,
      image: null,
      title: "Flora Pendaki Line Handal",
      description: "Sangat suka penggambaran watak Flora yang sangat kuat pada komik ini.",
      fullDescription: "Sangat suka penggambaran watak Flora yang sangat kuat pada komik ini. Karakter Flora digambarkan sebagai sosok yang tangguh dan pantang menyerah dalam menghadapi berbagai tantangan.",
      comments: []
    },
    {
      id: 4,
      username: "Zaenur24",
      profileImg: null,
      likes: 15,
      image: null,
      title: "Flora Pendaki Claus Handal",
      description: "Flora selalu bersemangat saat berburu di Hutan yang menguras keringat dan tenaga untuk melawan harimau.",
      fullDescription: "Flora selalu bersemangat saat berburu di Hutan yang menguras keringat dan tenaga untuk melawan harimau. Pertarungannya sangat epik dan menunjukkan keberanian yang luar biasa.",
      comments: []
    }
  ]);

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCommentChange = (id, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handlePostComment = (id) => {
    if (commentInputs[id]?.trim()) {
      setLikedWorks(prev => prev.map(work => 
        work.id === id 
          ? { ...work, comments: [...work.comments, commentInputs[id]] }
          : work
      ));
      setCommentInputs(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleUnlike = (id) => {
    if (window.confirm('Apakah Anda yakin ingin unlike karya ini?')) {
      setLikedWorks(prev => prev.filter(work => work.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex pt-20">
        {/* Sidebar Menu */}
        <div className="hidden lg:block w-64 p-6">
          <div className="bg-white border-4 border-[#66AC6E] rounded-3xl p-6 sticky top-24 shadow-lg">
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/profile"
                  className="block px-4 py-3 rounded-xl text-[#66AC6E] hover:bg-green-50 font-medium transition-all duration-200"
                >
                  Edit Profile
                </Link>
              </li>
              <li>
                <Link 
                  href="/manage-fanwork"
                  className="block px-4 py-3 rounded-xl text-[#66AC6E] hover:bg-green-50 font-medium transition-all duration-200"
                >
                  Manage Fanwork
                </Link>
              </li>
              <li>
                <Link 
                  href="/fanwork-liked"
                  className="block px-4 py-3 rounded-xl bg-[#66AC6E] text-white font-medium shadow-md"
                >
                  Liked Fanwork
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-[#66AC6E] mb-8">Karya yang Disukai</h1>

            {/* Fanwork Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {likedWorks.map((work) => (
                <div key={work.id} className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100">
                  
                  {/* Header with Profile + Likes */}
                  <div className="bg-[#66AC6E] rounded-2xl px-4 py-3 flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-[#66AC6E] font-bold text-xs">
                          {work.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <h2 className="font-bold text-white">{work.username}</h2>
                    </div>

                    <div className="flex items-center space-x-2 text-white font-semibold">
                      <span>{work.likes}</span>
                      <Heart className="fill-current" size={18} />
                    </div>
                  </div>

                  {/* Image Placeholder */}
                  <div className="w-full h-48 bg-gray-50 rounded-2xl flex flex-col items-center justify-center text-gray-400 mb-4 border-2 border-dashed border-gray-300">
                    <span className="text-sm">Image Placeholder</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#66AC6E] mb-2">
                    {work.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">
                    {expandedCards[work.id] ? work.fullDescription : work.description}
                  </p>

                  {/* Read More / Close Button */}
                  <button 
                    onClick={() => toggleExpand(work.id)}
                    className="text-[#66AC6E] font-semibold text-sm underline hover:text-green-700 transition mb-3"
                  >
                    {expandedCards[work.id] ? 'Tutup ▴' : 'Baca lebih lanjut ▾'}
                  </button>

                  {/* Comments Section */}
                  {expandedCards[work.id] && (
                    <div className="mb-4">
                      {work.comments.length === 0 ? (
                        <p className="text-gray-500 text-sm mb-3">Belum ada komentar</p>
                      ) : (
                        <div className="space-y-2 mb-3">
                          {work.comments.map((comment, idx) => (
                            <div key={idx} className="bg-gray-50 rounded-lg p-3 shadow-sm">
                              <p className="text-sm text-gray-700">{comment}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Comment Input */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Ketik komentar..."
                          value={commentInputs[work.id] || ''}
                          onChange={(e) => handleCommentChange(work.id, e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handlePostComment(work.id)}
                          className="flex-1 py-2 px-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                        />
                        <button 
                          onClick={() => handlePostComment(work.id)}
                          className="bg-[#E3B214] hover:bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium transition text-sm"
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => handleUnlike(work.id)}
                      className="bg-[#E85D75] hover:bg-red-600 text-white py-2 px-6 rounded-lg font-medium transition"
                    >
                      Unlike
                    </button>
                    <Link href={`/fanwork/${work.id}`} className="flex-1">
                      <button className="w-full bg-[#E3B214] hover:bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium transition">
                        Lihat Detail
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {likedWorks.length === 0 && (
              <div className="text-center py-20">
                <Heart className="mx-auto mb-4 text-gray-300" size={64} />
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  Belum ada karya yang disukai
                </h3>
                <p className="text-gray-500 mb-6">
                  Mulai jelajahi dan like karya favorit Anda!
                </p>
                <Link href="/fanwork">
                  <button className="bg-[#E3B214] hover:bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold transition">
                    Jelajahi Fanwork
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}