import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma-dev";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ firebaseUserId: string }> }
) {
  const firebaseUserId = (await context.params).firebaseUserId; // Explicitly await params

  console.log(firebaseUserId);
  if (!firebaseUserId) {
    return NextResponse.json(
      { error: "Missing firebaseUserId" },
      { status: 400 }
    );
  }

  try {
    const userInfo = await prisma.userInfo.findFirst({
      where: { firebaseUserId },
    });

    console.log(userInfo);
    if (!userInfo) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userInfo);
  } catch (error: any) {
    console.error("Error fetching user info:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
