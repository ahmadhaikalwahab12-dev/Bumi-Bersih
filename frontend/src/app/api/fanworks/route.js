import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const fanworks = await prisma.fanwork.findMany({
      where: { isPublished: true },
      include: {
        user: { select: { id: true, name: true } },
        images: true,
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: fanworks.map((f) => ({
        ...f,
        likesCount: f._count.likes,
        commentsCount: f._count.comments,
      })),
    });
  } catch (error) {
    console.error("GET ALL FANWORKS ERROR:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const image = formData.get("image");

    if (!title || !description || !image) {
      return NextResponse.json({ success: false, message: "Field wajib tidak lengkap" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const fileName = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`;
    const uploadDir = path.join(process.cwd(), "public/uploads/fanworks");

    fs.mkdirSync(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const fanwork = await prisma.fanwork.create({
      data: {
        title,
        description,
        isPublished: true,
        userId: 1, // GANTI DENGAN AUTHENTICATION NANTI
        images: {
          create: {
            url: `/uploads/fanworks/${fileName}`,
            filename: fileName,
            size: image.size,
            type: image.type,
          },
        },
      },
      include: {
        user: { select: { id: true, name: true } },
        images: true,
        _count: { select: { likes: true, comments: true } },
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...fanwork,
        likesCount: fanwork._count.likes,
        commentsCount: fanwork._count.comments,
      },
    });
  } catch (error) {
    console.error("POST FANWORK ERROR:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}