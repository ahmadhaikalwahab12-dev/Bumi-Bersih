"use client";
import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, User } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UploadFanwork from "../components/UploadFanwork";

export default function ManageFanwork() {
  const router = useRouter();
  const [expandedCards, setExpandedCards] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [fanworks, setFanworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [likesData, setLikesData] = useState({});
  const [commentsData, setCommentsData] = useState({});

  // Fetch fanworks dari database
  const fetchFanworks = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/my-fanworks", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Gagal mengambil data");
      }

      const json = await res.json();

      if (json.success) {
        setFanworks(json.data);
        
        // Load likes dan comments untuk setiap fanwork
        json.data.forEach(work => {
          fetchLikesData(work.id);
          fetchCommentsData(work.id);
        });
      }
    } catch (err) {
      console.error("Fetch my fanworks error:", err);
      alert("Gagal memuat data karya. Silakan refresh halaman.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch likes data untuk satu fanwork
  const fetchLikesData = async (fanworkId) => {
    try {
      const res = await fetch(`/api/fanworks/${fanworkId}/likes`);
      const json = await res.json();
      
      if (json.success) {
        setLikesData(prev => ({
          ...prev,
          [fanworkId]: json.data
        }));
      }
    } catch (error) {
      console.error("Fetch likes error:", error);
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
    fetchFanworks();
  }, []);

  // Handle upload success
  const handleUploadSuccess = (newFanwork) => {
    console.log("Upload success, refreshing data...");
    fetchFanworks();
    setShowUpload(false);
  };

  const toggleExpand = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Handle like/unlike
  const handleLike = async (fanworkId) => {
    try {
      const currentLikeData = likesData[fanworkId];
      const isLiked = currentLikeData?.isLiked;

      if (isLiked) {
        // Unlike
        const res = await fetch(`/api/fanworks/${fanworkId}/likes`, {
          method: "DELETE",
        });
        const json = await res.json();
        
        if (json.success) {
          setLikesData(prev => ({
            ...prev,
            [fanworkId]: json.data
          }));
        }
      } else {
        // Like
        const res = await fetch(`/api/fanworks/${fanworkId}/likes`, {
          method: "POST",
        });
        const json = await res.json();
        
        if (json.success) {
          setLikesData(prev => ({
            ...prev,
            [fanworkId]: json.data
          }));
        }
      }
    } catch (error) {
      console.error("Like/Unlike error:", error);
    }
  };

  const handleCommentChange = (id, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle post comment - dengan API
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

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus karya ini?')) {
      return;
    }

    try {
      const res = await fetch(`/api/fanworks/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("✅ Karya berhasil dihapus!");
        fetchFanworks();
      } else {
        throw new Error(data.message || "Gagal menghapus karya");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("❌ " + error.message);
    }
  };

  const handleEdit = (id) => {
    router.push(`/fanwork/edit/${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex pt-20">
        {/* Sidebar */}
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
                <p className="ml-4 text-gray-600">Memuat karya...</p>
              </div>
            ) : fanworks.length === 0 ? (
              /* Empty State */
              <div className="text-center py-20 bg-gray-50 rounded-3xl">
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
                {fanworks.map((work) => {
                  const likeData = likesData[work.id] || { totalLikes: 0, isLiked: false };
                  const workComments = commentsData[work.id] || [];
                  
                  return (
                    <div key={work.id} className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
                      
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
                          {/* Like Button */}
                          <button
                            onClick={() => handleLike(work.id)}
                            className="flex items-center space-x-1 text-white hover:scale-110 transition"
                          >
                            <span className="text-sm font-semibold">
                              {likeData.totalLikes}
                            </span>
                            <Heart 
                              size={18} 
                              className={likeData.isLiked ? "fill-current" : ""}
                            />
                          </button>

                          {/* Comment Count */}
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

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4">
                        <button 
                          onClick={() => handleDelete(work.id)}
                          className="bg-[#E85D75] hover:bg-red-600 text-white py-2 px-6 rounded-lg font-medium transition shadow-md"
                        >
                          Hapus
                        </button>
                        <button 
                          onClick={() => handleEdit(work.id)}
                          className="flex-1 bg-[#E3B214] hover:bg-yellow-500 text-white py-2 px-4 rounded-lg font-medium transition shadow-md"
                        >
                          Edit Postingan
                        </button>
                      </div>
                    </div>
                  );
                })}
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