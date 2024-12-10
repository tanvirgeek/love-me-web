import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-dev";

// Create a Favorite
export async function POST(req: NextRequest) {
  const data = await req.json();
  const favorite = await prisma.favorite.create({ data });
  return NextResponse.json(favorite);
}

// Get All Favorites with Pagination
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const favorites = await prisma.favorite.findMany({
    skip,
    take: limit,
    include: { user: true, favorite: true },
  });

  const total = await prisma.favorite.count();
  return NextResponse.json({ favorites, total, page, limit });
}

// Delete a Favorite
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.favorite.delete({ where: { id } });
  return NextResponse.json({ message: "Favorite deleted successfully" });
}
