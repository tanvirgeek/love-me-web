import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-dev";

// Create User Info
export async function POST(req: NextRequest) {
  const data = await req.json();
  const userInfo = await prisma.userInfo.create({ data });
  return NextResponse.json(userInfo);
}

// Get All User Info with Pagination
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const userInfos = await prisma.userInfo.findMany({ skip, take: limit });
  const total = await prisma.userInfo.count();

  return NextResponse.json({ userInfos, total, page, limit });
}

// Update User Info
export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { id, ...updates } = data;

  const userInfo = await prisma.userInfo.update({
    where: { id },
    data: updates,
  });

  return NextResponse.json(userInfo);
}

// Delete User Info
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.userInfo.delete({ where: { id } });
  return NextResponse.json({ message: "User info deleted successfully" });
}
