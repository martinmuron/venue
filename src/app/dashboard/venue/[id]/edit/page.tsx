import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { VenueEditForm } from "@/components/dashboard/venue-edit-form"
import { Button } from "@/components/ui/button"

interface VenueEditPageProps {
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
        inquiries: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        _count: {
          select: {
            inquiries: true,
          }
        }
      }
    })

    return venue
  } catch (error) {
    console.error("Error fetching venue data:", error)
    return null
  }
}

export default async function VenueEditPage({ params }: VenueEditPageProps) {
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-title-1 text-gray-900 mb-2">
                Upravit prostor: {venue.name}
              </h1>
              <p className="text-body text-gray-600">
                Upravte informace o vašem prostoru a spravujte jeho nastavení
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => window.location.href = `/dashboard/venue/${venue.id}/posts`}
              >
                Manage Posts
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(`/venues/${venue.slug}`, '_blank')}
              >
                View Public Page
              </Button>
            </div>
          </div>
        </div>

        <VenueEditForm venue={venue} />
      </div>
    </div>
  )
}