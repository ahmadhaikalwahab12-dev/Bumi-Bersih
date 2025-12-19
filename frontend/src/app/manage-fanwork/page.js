"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Heart, User, LogOut } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";
import UploadFanwork from "../components/UploadFanwork";

// =======================
// MAIN PAGE
// =======================
export default function ManageFanwork() {
  const [expandedCards, setExpandedCards] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [fanworks, setFanworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);

  // Fetch fanworks dari database
  const fetchFanworks = async () => {
  try {
    setLoading(true);

    const res = await fetch("/api/my-fanworks", {
      cache: "no-store",
    });

    const json = await res.json();

    if (json.success) {
  const transformed = json.data.map((work) => ({
    id: work.id,
    title: work.title,
    description: work.description,
    fullDescription: work.description,
    image: work.imageUrl,        // ✅ dari DB
    username: work.user?.name || "Me",
    likes: 0,
    comments: [],
  }));

  setFanworks(transformed);
}

  } catch (err) {
    console.error("Fetch my fanworks error:", err);
  } finally {
    setLoading(false);
  }
};



  // Load data saat component mount
  useEffect(() => {
    fetchFanworks();
  }, []);

  // Handle upload success
  const handleUploadSuccess = (newFanwork) => {
    console.log("Upload success, refreshing data...");
    fetchFanworks(); // Refresh data
    setShowUpload(false);
  };

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
      setFanworks(prev => prev.map(work => 
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

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus karya ini?')) {
      return;
    }

    try {
      const res = await fetch(`/api/fanworks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("Delete success, refreshing data...");
        fetchFanworks(); // Refresh data
      } else {
        alert("Gagal menghapus karya");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Terjadi kesalahan");
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/fanwork/edit/${id}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex pt-20">
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
                  className="block px-4 py-3 rounded-xl bg-[#66AC6E] text-white font-medium shadow-md"
                >
                  Manage Fanwork
                </Link>
              </li>
              <li>
                <Link 
                  href="/fanwork-liked"
                  className="block px-4 py-3 rounded-xl text-[#66AC6E] hover:bg-green-50 font-medium transition-all duration-200"
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
            
            {/* Header with Upload Button */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-[#66AC6E]">Manage Fanwork</h1>
              <button
                onClick={() => setShowUpload(true)}
                className="bg-[#66AC6E] hover:bg-[#5a9d5e] text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition"
              >
                + Upload Karya Baru
              </button>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#66AC6E]"></div>
              </div>
            ) : fanworks.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Belum ada karya
                </h3>
                <p className="text-gray-500 mb-6">
                  Mulai upload karya pertama Anda!
                </p>
                <button
                  onClick={() => setShowUpload(true)}
                  className="bg-[#66AC6E] hover:bg-[#5a9d5e] text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Upload Sekarang
                </button>
              </div>
            ) : (
              /* Fanwork Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fanworks.map((work) => (
                  <div key={work.id} className="bg-white rounded-3xl shadow-lg p-6">
                    
                    {/* Header with Profile + Likes */}
                    <div className="bg-[#66AC6E] rounded-2xl px-4 py-3 flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                          <span className="text-green-700 font-bold text-xs">
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

                    {/* Image */}
                    <div className="w-full h-48 bg-white rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed border-gray-300 overflow-hidden relative">
                      {work.image ? (
                        <Image
                          src={work.image}
                          alt={work.title}
                          fill
                          className="object-cover rounded-2xl"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="text-center">
                          <span className="text-sm text-gray-400">Image Placeholder</span>
                        </div>
                      )}
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
                              <div key={idx} className="bg-white rounded-lg p-3 shadow-sm">
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
                        onClick={() => handleDelete(work.id)}
                        className="bg-[#E85D75] hover:bg-red-600 text-white py-2 px-6 rounded-lg font-medium transition"
                      >
                        Hapus
                      </button>
                      <button 
                        onClick={() => handleEdit(work.id)}
                        className="flex-1 bg-[#E3B214] hover:bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium transition"
                      >
                        Edit Postingan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <UploadFanwork
         onClose={() => setShowUpload(false)}
         onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}