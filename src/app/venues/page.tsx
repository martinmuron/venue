import { Suspense } from "react"
import { VenueCard } from "@/components/venue/venue-card"
import { VenueFilters } from "@/components/venue/venue-filters"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { VENUE_TYPES, CITY_DISTRICTS, CAPACITY_RANGES } from "@/types"

interface SearchParams {
  q?: string
  type?: string
  district?: string
  capacity?: string
}

async function getVenues(searchParams: SearchParams) {
  try {
    const where: any = {
      status: { in: ["active", "draft"] },
    }

    // Search query
    if (searchParams.q) {
      where.OR = [
        { name: { contains: searchParams.q, mode: 'insensitive' } },
        { description: { contains: searchParams.q, mode: 'insensitive' } },
        { address: { contains: searchParams.q, mode: 'insensitive' } },
      ]
    }

    // Venue type filter
    if (searchParams.type && searchParams.type !== 'all') {
      where.venueType = searchParams.type
    }

    // District filter
    if (searchParams.district && searchParams.district !== 'all') {
      where.address = {
        contains: searchParams.district,
        mode: 'insensitive'
      }
    }

    // Capacity filter
    if (searchParams.capacity && searchParams.capacity !== 'all') {
      const capacityRanges: { [key: string]: any } = {
        'Up to 25 people': { OR: [{ capacitySeated: { lte: 25 } }, { capacityStanding: { lte: 25 } }] },
        '25 - 50 people': { OR: [
          { capacitySeated: { gte: 25, lte: 50 } },
          { capacityStanding: { gte: 25, lte: 50 } }
        ]},
        '50 - 100 people': { OR: [
          { capacitySeated: { gte: 50, lte: 100 } },
          { capacityStanding: { gte: 50, lte: 100 } }
        ]},
        '100 - 200 people': { OR: [
          { capacitySeated: { gte: 100, lte: 200 } },
          { capacityStanding: { gte: 100, lte: 200 } }
        ]},
        'Over 200 people': { OR: [
          { capacitySeated: { gte: 200 } },
          { capacityStanding: { gte: 200 } }
        ]},
      }

      if (capacityRanges[searchParams.capacity]) {
        Object.assign(where, capacityRanges[searchParams.capacity])
      }
    }

    const venues = await db.venue.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        address: true,
        capacitySeated: true,
        capacityStanding: true,
        venueType: true,
        images: true,
        status: true,
      }
    })

    // Ensure images is always an array
    return venues.map(venue => ({
      ...venue,
      images: Array.isArray(venue.images) ? venue.images : []
    }))
  } catch (error) {
    console.error("Error fetching venues:", error)
    return []
  }
}

function VenueGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
          <div className="p-4 sm:p-6">
            <div className="h-5 sm:h-6 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse mb-3 w-3/4" />
            <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse mb-4 w-full" />
            <div className="flex justify-between">
              <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-1/3" />
              <div className="h-3 sm:h-4 bg-gray-200 rounded animate-pulse w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

async function VenueGrid({ searchParams }: { searchParams: SearchParams }) {
  const venues = await getVenues(searchParams)

  if (venues.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <h3 className="text-lg sm:text-title-3 text-black mb-3 sm:mb-4">
          No venues found
        </h3>
        <p className="text-sm sm:text-body text-gray-600 mb-4 sm:mb-6">
          Try adjusting the filters or searching for other venues.
        </p>
        <Button asChild size="sm" className="sm:size-default rounded-xl bg-black text-white hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl">
          <a href="/venues">Show all venues</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
      {venues.map((venue: any) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  )
}

export default async function VenuesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const resolvedSearchParams = await searchParams
  return (
    <div className="min-h-screen bg-white">
      {/* Header - No longer sticky */}
      <div className="bg-white border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-title-1 text-black mb-6 sm:mb-8 font-bold tracking-tight">
              Event spaces in the city
            </h1>
          </div>
          
          {/* Search and Filters */}
          <div className="flex justify-center">
            <div className="w-full max-w-5xl">
              <VenueFilters initialValues={resolvedSearchParams} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Venue Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Suspense fallback={<VenueGridSkeleton />}>
          <VenueGrid searchParams={resolvedSearchParams} />
        </Suspense>
      </div>
    </div>
  )
}