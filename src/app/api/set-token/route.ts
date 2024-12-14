// app/api/set-token/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure it's secure in production
    maxAge: 60 * 60 * 24 * 7, // Cookie expiration time (7 days)
    path: "/",
  });

  return response;
}
