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

    // Add placeholder images for posts without images using a reliable service
    const postsWithImages = posts.map((post, index) => ({
      ...post,
      imageUrl: post.imageUrl || `https://picsum.photos/600/400?random=${index + 1}`
    }))

    return NextResponse.json({ posts: postsWithImages })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}