import { getPrisma } from "@/libs/getPrisma";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const searchText = request.nextUrl.searchParams.get("searchText");
  const prisma = getPrisma();

  // Modify this line to perform a case-insensitive search and order by course code
  const courses = await prisma.course.findMany({
    where: {
      title: {
        contains: searchText,
        mode: "insensitive",
      },
    },
    orderBy: {
      courseNo: "asc",
    },
  });

  return NextResponse.json({ ok: true, courses });
};
