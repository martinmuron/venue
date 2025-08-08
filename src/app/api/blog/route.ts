import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const posts = await db.blogPost.findMany({
      where: { 
        status: "published",
        published: true
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        imageUrl: true,
        createdAt: true,
        author: {
          select: { name: true }
        },
        tags: true
      }
    })

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}