import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-dev";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ firebaseUserId: string }> }
) {
  const firebaseUserId = (await context.params).firebaseUserId; // Explicitly await params

  if (!firebaseUserId) {
    return NextResponse.json(
      { error: "Missing firebaseUserId" },
      { status: 400 }
    );
  }

  try {
    const userInfo = await prisma.user.findUnique({
      where: { firebaseUserId },
      include: { userInfo: true, favoritedBy: true, favorites: true },
    });

    if (!userInfo) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userInfo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ firebaseUserId: string }> }
) {
  const firebaseUserId = (await context.params).firebaseUserId; // Explicitly await params

  if (!firebaseUserId) {
    return NextResponse.json(
      { error: "Missing firebaseUserId" },
      { status: 400 }
    );
  }

  try {
    const requestData = await req.json(); // Parse incoming JSON payload

    // Remove any fields not meant for updating to avoid unexpected behavior
    const allowedFields = [
      "name",
      "email",
      "role",
      "gender",
      "district",
      "division",
    ];
    const dataToUpdate: { [key: string]: any } = {};
    for (const key of allowedFields) {
      if (requestData[key] !== undefined) {
        dataToUpdate[key] = requestData[key];
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { firebaseUserId },
      data: dataToUpdate, // Update only the specified fields
      include: {
        userInfo: true,
        favoritedBy: true,
        favorites: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma's error code for record not found
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
