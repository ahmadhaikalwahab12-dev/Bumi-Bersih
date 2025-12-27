"use client";

export default function Notifikasi({ show, message }) {
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-[9999] bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl animate-slide-in">
      {message}
    </div>
  );
}
