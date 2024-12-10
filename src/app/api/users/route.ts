import prisma from "@/lib/prisma-dev";
import { CreateUserSchema } from "@/lib/types";
import { UpdateUserSchema } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    // Validate data using Zod
    const validatedData = CreateUserSchema.parse(json);

    // Use Prisma's UserCreateInput type to ensure consistency
    const user = await prisma.user.create({ data: validatedData });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format Zod error into a user-friendly JSON
      const formattedErrors = error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
        validation: err.code,
      }));
      return NextResponse.json(
        { error: "Validation failed", details: formattedErrors },
        { status: 400 }
      );
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Unknown error!" }, { status: 400 });
    }
  }
}

// Get All Users with Pagination
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const users = await prisma.user.findMany({
    skip,
    take: limit,
    include: { userInfo: true, favorites: true, favoritedBy: true },
  });

  const total = await prisma.user.count();
  return NextResponse.json({ users, total, page, limit });
}

export async function PUT(req: NextRequest) {
  try {
    const json = await req.json();
    // Validate data using Zod
    const validatedData = UpdateUserSchema.parse(json);

    // Extract id and update fields
    const { id, ...updateFields } = validatedData;

    const user = await prisma.user.update({
      where: { id },
      data: updateFields,
    });

    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: "Unknown error!" }, { status: 400 });
    }
  }
}

// Delete a User
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ message: "User deleted successfully" });
}
