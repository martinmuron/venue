import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const createPostSchema = z.object({
  title: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  images: z.array(z.string().url()).max(5, "Maximum 5 images allowed").optional(),
  videoUrl: z.string().url().optional(),
  status: z.enum(["published", "draft"]).optional().default("published"),
})

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: venueId } = await context.params

    const posts = await db.venuePost.findMany({
      where: {
        venueId,
        status: "published",
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching venue posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { id: venueId } = await context.params

    // Verify that the user is the venue manager
    const venue = await db.venue.findFirst({
      where: {
        id: venueId,
        managerId: session.user.id,
      },
    })

    if (!venue) {
      return NextResponse.json(
        { error: "Venue not found or access denied" },
        { status: 404 }
      )
    }

    const body = await request.json()
    const validatedData = createPostSchema.parse(body)

    const post = await db.venuePost.create({
      data: {
        venueId,
        title: validatedData.title || "",
        content: validatedData.content,
        images: validatedData.images || [],
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating venue post:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    )
  }
}