"use client";

import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, ChevronDown, ChevronUp, User } from "lucide-react";
import Image from "next/image";
import UploadFanwork from "@/components/UploadFanwork"; // sesuaikan path jika perlu

function FanworkCard({ fanwork, isLiked, onLike, onCommentAdded }) {
  const [expanded, setExpanded] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);

  const description = fanwork.description || "";

  useEffect(() => {
    if (expanded) fetchComments();
  }, [expanded]);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/fanworks/${fanwork.id}/comments`);
      const result = await res.json();
      if (result.success) setComments(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    setPostingComment(true);
    try {
      const res = await fetch(`/api/fanworks/${fanwork.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment.trim() }),
      });
      const result = await res.json();
      if (result.success) {
        setNewComment("");
        fetchComments();
        onCommentAdded?.();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPostingComment(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-gray-100">
      {/* Header */}
      <div className="bg-[#66AC6E] px-5 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center">
            <User size={18} className="text-green-700" />
          </div>
          <span className="text-white font-bold">
            {fanwork.user?.name || "User"}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
          <span className="text-white font-bold">{fanwork.likesCount || 0}</span>
          <Heart size={20} className="text-white" />
        </div>
      </div>

      {/* Image dari array images */}
      <div className="relative h-72 w-full bg-gray-50">
        {fanwork.images?.[0]?.url ? (
          <Image
            src={fanwork.images[0].url}
            alt={fanwork.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#66AC6E] mb-3">{fanwork.title}</h3>
        <p className="text-gray-600 text-sm mb-3">
          {expanded
            ? description
            : description.length > 120
            ? description.substring(0, 120) + "..."
            : description}
        </p>

        {description.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#66AC6E] font-bold text-sm flex items-center gap-1"
          >
            {expanded ? "Tutup" : "Baca lebih lanjut"}
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        )}

        {expanded && (
          <div className="mt-4">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
              <MessageCircle size={16} /> Komentar
            </h4>
            {comments.map((c) => (
              <div key={c.id} className="bg-gray-50 p-3 rounded-xl mb-2">
                <p className="text-sm font-semibold">{c.user?.name || "User"}</p>
                <p className="text-sm">{c.content}</p>
              </div>
            ))}
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
              placeholder="Ketik komentar..."
              className="w-full border p-2 rounded mt-2"
            />
          </div>
        )}

        {!expanded && (
          <div className="flex justify-between pt-3">
            <button onClick={() => onLike(fanwork.id)}>
              <Heart
                className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </button>
            <button onClick={() => setExpanded(true)}>
              <MessageCircle size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FanworkPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fanworks, setFanworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedFanworks, setLikedFanworks] = useState(new Set());

  const fetchFanworks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/fanworks");
      const result = await res.json();
      if (result.success) setFanworks(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLikedFanworks = async () => {
    try {
      const res = await fetch("/api/likes");
      const result = await res.json();
      if (result.success) {
        setLikedFanworks(new Set(result.data.map((item) => item.fanworkId)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFanworks();
    fetchLikedFanworks();
  }, []);

  const handleLike = async (fanworkId) => {
    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fanworkId }),
      });
      const result = await res.json();

      if (result.success) {
        setLikedFanworks((prev) => {
          const set = new Set(prev);
          if (result.action === "liked") set.add(fanworkId);
          else set.delete(fanworkId);
          return set;
        });
        fetchFanworks(); // refresh count
      }
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={() => setShowUploadModal(true)}
        className="m-10 bg-[#E3B214] text-white px-6 py-3 rounded-full font-bold"
      >
        Upload Karyamu!
      </button>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          {fanworks.map((fw) => (
            <FanworkCard
              key={fw.id}
              fanwork={fw}
              isLiked={likedFanworks.has(fw.id)}
              onLike={handleLike}
              onCommentAdded={fetchFanworks}
            />
          ))}
        </div>
      )}

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <UploadFanwork onSuccess={fetchFanworks} onClose={() => setShowUploadModal(false)} />
        </div>
      )}
    </div>
  );
}