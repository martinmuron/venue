import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { VenuePostsManager } from "@/components/venue/venue-posts-manager"

interface VenuePostsPageProps {
  params: Promise<{
    id: string
  }>
}

async function getVenueData(venueId: string, userId: string) {
  try {
    const venue = await db.venue.findFirst({
      where: {
        id: venueId,
        managerId: userId, // Ensure user owns this venue
      },
      include: {
        posts: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    return venue
  } catch (error) {
    console.error("Error fetching venue data:", error)
    return null
  }
}

export default async function VenuePostsPage({ params }: VenuePostsPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id || session.user.role !== "venue_manager") {
    redirect("/prihlaseni?callbackUrl=/dashboard")
  }

  const resolvedParams = await params
  const venue = await getVenueData(resolvedParams.id, session.user.id)

  if (!venue) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-title-1 text-gray-900 mb-2">
            Posts Management: {venue.name}
          </h1>
          <p className="text-body text-gray-600">
            Create and manage posts for your venue to keep your audience updated
          </p>
        </div>

        <VenuePostsManager venue={venue} />
      </div>
    </div>
  )
}