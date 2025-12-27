"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditKarya() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fanworkId = searchParams.get("id"); // Ambil ID dari query parameter

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [currentImage, setCurrentImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isAgree, setIsAgree] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  // Fetch data fanwork yang akan di-edit
  useEffect(() => {
    const fetchFanwork = async () => {
      // Validasi jika tidak ada ID atau ID invalid
      if (!fanworkId || isNaN(parseInt(fanworkId))) {
        setAlert({ 
          type: "error", 
          message: "ID karya tidak valid. Silakan akses halaman ini dari Manage Fanwork." 
        });
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/fanworks/${fanworkId}`);
        const data = await res.json();

        if (res.ok && data.success) {
          setTitle(data.data.title || "");
          setDesc(data.data.description || "");
          setCurrentImage(data.data.imageUrl || null);
          setPreviewImage(data.data.imageUrl || null);
        } else {
          setAlert({ 
            type: "error", 
            message: data.message || "Gagal memuat data karya" 
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setAlert({ 
          type: "error", 
          message: "Terjadi kesalahan saat memuat data" 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFanwork();
  }, [fanworkId]);

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi tipe file
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setAlert({
        type: "error",
        message: "Format tidak didukung. Gunakan JPG, PNG, GIF, atau WEBP",
      });
      return;
    }

    // Validasi ukuran (12MB)
    if (file.size > 12 * 1024 * 1024) {
      setAlert({
        type: "error",
        message: "Ukuran file maksimal 12MB",
      });
      return;
    }

    setNewImage(file);
    setAlert({ type: "", message: "" });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle save/update
  const handleSave = async () => {
    if (!title.trim()) {
      setAlert({ type: "error", message: "Judul wajib diisi!" });
      return;
    }

    if (!desc.trim()) {
      setAlert({ type: "error", message: "Deskripsi wajib diisi!" });
      return;
    }

    if (!isAgree) {
      setAlert({ type: "error", message: "Anda harus menyetujui kebijakan!" });
      return;
    }

    setSaving(true);
    setAlert({ type: "", message: "" });

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", desc.trim());
      
      // Hanya kirim gambar baru jika user mengupload gambar baru
      if (newImage) {
        formData.append("image", newImage);
      }

      const res = await fetch(`/api/fanworks/${fanworkId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Gagal menyimpan perubahan");
      }

      setAlert({
        type: "success",
        message: "✅ Perubahan berhasil disimpan ke database!",
      });

      // Redirect ke manage fanwork setelah 1.5 detik
      setTimeout(() => {
        router.push("/manage-fanwork");
      }, 1500);

    } catch (error) {
      console.error("Save error:", error);
      setAlert({
        type: "error",
        message: error.message || "Terjadi kesalahan saat menyimpan",
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus karya ini?")) {
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`/api/fanworks/${fanworkId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Gagal menghapus karya");
      }

      setAlert({
        type: "success",
        message: "✅ Karya berhasil dihapus!",
      });

      // Redirect setelah 1 detik
      setTimeout(() => {
        router.push("/manage-fanwork");
      }, 1000);

    } catch (error) {
      console.error("Delete error:", error);
      setAlert({
        type: "error",
        message: error.message || "Terjadi kesalahan saat menghapus",
      });
      setSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    router.push("/manage-fanwork");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6EAD75]"></div>
      </div>
    );
  }

  // Jika ada error saat loading
  if (alert.type === "error" && !title) {
    return (
      <div className="min-h-screen bg-[#F3F3F3] flex justify-center items-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Terjadi Kesalahan
          </h2>
          <p className="text-gray-600 mb-6">{alert.message}</p>
          <button
            onClick={() => router.push("/manage-fanwork")}
            className="bg-[#6EAD75] hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Kembali ke Manage Fanwork
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F3F3] flex justify-center items-center py-16 px-4">
      <div className="bg-[#6EAD75] w-full max-w-2xl rounded-3xl shadow-xl p-10">

        {/* NOTIFICATION */}
        {alert.message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg text-center font-semibold ${
              alert.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* HEADER */}
        <h1 className="text-center text-4xl font-bold text-white mb-10">
          Edit <span className="text-[#E3B214]">Fanwork</span>
        </h1>

        <div className="space-y-6">

          {/* JUDUL */}
          <div>
            <label className="text-sm font-semibold text-white">
              Judul fanwork <span className="text-[#E3B214]">*</span>
            </label>
            <input
              type="text"
              className="mt-2 w-full px-4 py-3 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#E3B214]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={saving}
              maxLength={200}
            />
            <p className="text-xs text-white/70 mt-1">
              {title.length}/200 karakter
            </p>
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="text-sm font-semibold text-white">
              Deskripsi fanwork <span className="text-[#E3B214]">*</span>
            </label>
            <textarea
              className="mt-2 w-full px-4 py-3 h-32 rounded-lg bg-white outline-none resize-none focus:ring-2 focus:ring-[#E3B214]"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              disabled={saving}
              maxLength={1000}
            />
            <p className="text-xs text-white/70 mt-1">
              {desc.length}/1000 karakter
            </p>
          </div>

          {/* GAMBAR */}
          <div>
            <label className="text-sm font-semibold text-white">
              Gambar fanwork
            </label>
            <p className="text-xs text-white/80 mt-1">
              Maksimal 12MB (JPG, PNG, GIF, WEBP)
            </p>

            <div className="mt-3 relative border-2 border-dashed border-white rounded-xl bg-white/40 h-48 flex justify-center items-center overflow-hidden">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white/60">Tidak ada gambar</span>
              )}

              {/* Upload/Change Button */}
              <label className="absolute bottom-3 right-3 cursor-pointer bg-[#E3B214] hover:bg-[#c99b0f] p-2 rounded-lg transition">
                <Image 
                  src="/icon/upfan.svg" 
                  alt="upload" 
                  width={24} 
                  height={24} 
                />
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleFileChange}
                  disabled={saving}
                />
              </label>
            </div>
            {newImage && (
              <p className="text-xs text-white mt-2">
                ✅ Gambar baru dipilih: {newImage.name}
              </p>
            )}
          </div>

          {/* AGREEMENT */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={isAgree}
              onChange={() => setIsAgree(!isAgree)}
              className="mt-1 accent-[#E3B214] w-4 h-4 cursor-pointer"
              disabled={saving}
            />
            <p className="text-xs text-white leading-relaxed">
              Dengan melanjutkan, anda setuju dengan{" "}
              <a href="#" className="underline font-semibold">
                Kebijakan Publikasi
              </a>{" "}
              serta{" "}
              <a href="#" className="underline font-semibold">
                Syarat dan Ketentuan
              </a>.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-3">
            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              disabled={!isAgree || saving}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                isAgree && !saving
                  ? "bg-[#E3B214] hover:bg-[#c99b0f] text-white shadow-md"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>

            {/* DELETE BUTTON */}
            <button
              onClick={handleDelete}
              disabled={saving}
              className="w-full bg-[#E85D75] hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition shadow-md"
            >
              {saving ? "Menghapus..." : "Delete Karya"}
            </button>

            {/* CANCEL BUTTON */}
            <button
              onClick={handleCancel}
              disabled={saving}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg transition"
            >
              Batal
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}