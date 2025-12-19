export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("📖 Fetching MY fanworks...");

    /**
     * ⚠️ DEMO USER (sementara)
     * WAJIB konsisten dengan POST /api/fanworks
     */
    const user = await prisma.user.findUnique({
      where: {
        email: "demo@fanwork.com",
      },
    });

    // Kalau user belum ada, return kosong (bukan error)
    if (!user) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    // Ambil fanwork milik user
    const fanworks = await prisma.fanwork.findMany({
      where: {
        authorId: user.id,
        published: true,
        status: "PUBLISHED",
      },
      include: {
        images: {
          where: {
            isPrimary: true,
          },
          take: 1,
        },
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            bookmarks: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`✅ Found ${fanworks.length} my fanworks`);

    return NextResponse.json({
      success: true,
      data: fanworks,
    });
  } catch (error) {
    console.error("❌ MY FANWORKS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil fanwork user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
