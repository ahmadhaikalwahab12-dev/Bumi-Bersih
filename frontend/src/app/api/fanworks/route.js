// app/api/fanworks/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// GET untuk list fanworks
export async function GET() {
  try {
    console.log("📖 Fetching fanworks...");

    const fanworks = await prisma.fanwork.findMany({
      where: {
        isPublished: true, // ✅ SESUAI schema
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: fanworks,
    });
  } catch (error) {
    console.error("❌ GET ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}



export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
