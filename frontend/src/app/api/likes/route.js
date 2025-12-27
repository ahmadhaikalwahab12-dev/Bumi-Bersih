import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Ambil semua fanwork yang di-like user saat ini (hardcode userId=1 sementara)
    const likes = await prisma.like.findMany({
      where: { userId: 1 },
      select: { fanworkId: true },
    });

    return NextResponse.json({
      success: true,
      data: likes,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { fanworkId } = await req.json();
    const userId = 1; // GANTI DENGAN AUTH NANTI

    const existingLike = await prisma.like.findUnique({
      where: { userId_fanworkId: { userId, fanworkId } },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { userId_fanworkId: { userId, fanworkId } },
      });
      return NextResponse.json({ success: true, action: "unliked" });
    } else {
      // Like
      await prisma.like.create({
        data: { userId, fanworkId },
      });
      return NextResponse.json({ success: true, action: "liked" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}