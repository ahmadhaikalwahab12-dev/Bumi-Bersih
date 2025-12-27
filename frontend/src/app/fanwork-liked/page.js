"use client";
import React, { useState, useEffect } from "react";
import { Heart, User, MessageCircle } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";

export default function FanworkLiked() {
  const [expandedCards, setExpandedCards] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [likedWorks, setLikedWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsData, setCommentsData] = useState({});

  // Fetch liked fanworks dari database
  const fetchLikedFanworks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/liked-fanworks", {
        cache: "no-store",
      });

      const json = await res.json();

      if (json.success) {
        setLikedWorks(json.data);
        
        // Load comments untuk setiap fanwork
        json.data.forEach(item => {
          fetchCommentsData(item.fanwork.id);
        });
      }
    } catch (error) {
      console.error("Fetch liked fanworks error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments data untuk satu fanwork
  const fetchCommentsData = async (fanworkId) => {
    try {
      const res = await fetch(`/api/fanworks/${fanworkId}/comments`);
      const json = await res.json();
      
      if (json.success) {
        setCommentsData(prev => ({
          ...prev,
          [fanworkId]: json.data
        }));
      }
    } catch (error) {
      console.error("Fetch comments error:", error);
    }
  };

  // Load data saat component mount
  useEffect(() => {
    fetchLikedFanworks();
  }, []);

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

  // Handle post comment
  const handlePostComment = async (fanworkId) => {
    const commentText = commentInputs[fanworkId]?.trim();
    
    if (!commentText) return;

    try {
      const res = await fetch(`/api/fanworks/${fanworkId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentText,
        }),
      });

      const json = await res.json();

      if (json.success) {
        // Reset input
        setCommentInputs(prev => ({
          ...prev,
          [fanworkId]: ''
        }));

        // Refresh comments
        fetchCommentsData(fanworkId);
      }
    } catch (error) {
      console.error("Post comment error:", error);
      alert("Gagal menambahkan komentar");
    }
  };

  // Handle unlike - hapus dari database
  const handleUnlike = async (fanworkId) => {
    if (!window.confirm('Apakah Anda yakin ingin unlike karya ini?')) {
      return;
    }

    try {
      const res = await fetch(`/api/fanworks/${fanworkId}/likes`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (json.success) {
        // Refresh data - karya akan hilang dari list
        fetchLikedFanworks();
      } else {
        alert("Gagal unlike karya");
      }
    } catch (error) {
      console.error("Unlike error:", error);
      alert("Terjadi kesalahan saat unlike");
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

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66AC6E]"></div>
                <p className="ml-4 text-gray-600">Memuat karya...</p>
              </div>
            ) : likedWorks.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20 bg-gray-50 rounded-3xl">
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
            ) : (
              /* Fanwork Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {likedWorks.map((item) => {
                  const work = item.fanwork;
                  const workComments = commentsData[work.id] || [];

                  return (
                    <div key={work.id} className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100">
                      
                      {/* Header with Profile + Likes */}
                      <div className="bg-[#66AC6E] rounded-2xl px-4 py-3 flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <User size={16} className="text-green-700" />
                          </div>
                          <h2 className="font-bold text-white">
                            {work.user?.name || "User"}
                          </h2>
                        </div>

                        <div className="flex items-center space-x-4">
                          {/* Likes Count */}
                          <div className="flex items-center space-x-1 text-white">
                            <span className="text-sm font-semibold">
                              {work.likesCount || 0}
                            </span>
                            <Heart className="fill-current" size={18} />
                          </div>

                          {/* Comments Count */}
                          <div className="flex items-center space-x-1 text-white">
                            <span className="text-sm font-semibold">
                              {workComments.length}
                            </span>
                            <MessageCircle size={18} />
                          </div>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="w-full h-48 bg-gray-100 rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-300 overflow-hidden relative">
                        {work.imageUrl ? (
                          <Image
                            src={work.imageUrl}
                            alt={work.title}
                            fill
                            className="object-cover rounded-2xl"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        ) : (
                          <div className="text-center">
                            <span className="text-sm text-gray-400">No Image</span>
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-[#66AC6E] mb-2">
                        {work.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-2">
                        {expandedCards[work.id] 
                          ? work.description 
                          : work.description.length > 100
                            ? work.description.substring(0, 100) + "..."
                            : work.description
                        }
                      </p>

                      {/* Read More / Close Button */}
                      {work.description.length > 100 && (
                        <button 
                          onClick={() => toggleExpand(work.id)}
                          className="text-[#66AC6E] font-semibold text-sm underline hover:text-green-700 transition mb-3"
                        >
                          {expandedCards[work.id] ? 'Tutup ▴' : 'Baca lebih lanjut ▾'}
                        </button>
                      )}

                      {/* Comments Section */}
                      {expandedCards[work.id] && (
                        <div className="mb-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">
                            Komentar ({workComments.length})
                          </h4>

                          {workComments.length === 0 ? (
                            <p className="text-gray-500 text-sm mb-3">Belum ada komentar</p>
                          ) : (
                            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
                              {workComments.map((comment) => (
                                <div key={comment.id} className="bg-gray-50 rounded-lg p-3 shadow-sm">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <div className="w-5 h-5 bg-[#66AC6E] rounded-full flex items-center justify-center">
                                      <User size={10} className="text-white" />
                                    </div>
                                    <span className="text-xs font-semibold text-gray-700">
                                      {comment.user?.name || "User"}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 pl-7">
                                    {comment.content}
                                  </p>
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
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  handlePostComment(work.id);
                                }
                              }}
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

                      {/* Footer - Liked At */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-400">
                          Disukai pada {new Date(item.likedAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <button 
                          onClick={() => handleUnlike(work.id)}
                          className="bg-[#E85D75] hover:bg-red-600 text-white py-2 px-6 rounded-lg font-medium transition shadow-md"
                        >
                          Unlike
                        </button>
                        <Link href={`/fanwork/${work.id}`} className="flex-1">
                          <button className="w-full bg-[#E3B214] hover:bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium transition shadow-md">
                            Lihat Detail
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}