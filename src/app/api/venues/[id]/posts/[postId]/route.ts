import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const updatePostSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, "Content is required").optional(),
  images: z.array(z.string().url()).max(5, "Maximum 5 images allowed").optional(),
  videoUrl: z.string().url().optional(),
  status: z.enum(["published", "draft"]).optional(),
})

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string; postId: string }> }
) {
  try {
    const { id: venueId, postId } = await context.params

    const post = await db.venuePost.findUnique({
      where: {
        id: postId,
        venueId,
      },
    })

    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching venue post:", error)
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string; postId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id: venueId, postId } = await context.params

    // Verify that the user is the venue manager and the post belongs to the venue
    const post = await db.venuePost.findFirst({
      where: {
        id: postId,
        venueId,
        venue: {
          managerId: session.user.id,
        },
      },
    })

    if (!post) {
      return NextResponse.json(
        { error: "Post not found or access denied" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = updatePostSchema.parse(body)

    const updatedPost = await db.venuePost.update({
      where: {
        id: postId,
      },
      data: validatedData,
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating venue post:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string; postId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id: venueId, postId } = await context.params

    // Verify that the user is the venue manager and the post belongs to the venue
    const post = await db.venuePost.findFirst({
      where: {
        id: postId,
        venueId,
        venue: {
          managerId: session.user.id,
        },
      },
    })

    if (!post) {
      return NextResponse.json(
        { error: "Post not found or access denied" },
        { status: 404 }
      )
    }

    await db.venuePost.delete({
      where: {
        id: postId,
      },
    })

    return NextResponse.json({ message: "Post deleted successfully" })
  } catch (error) {
    console.error("Error deleting venue post:", error)
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    )
  }
}