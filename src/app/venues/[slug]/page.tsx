import { notFound } from "next/navigation"
import { VenueGallery } from "@/components/venue/venue-gallery"
import { VenueContactForm } from "@/components/forms/venue-contact-form"
import { HeartButton } from "@/components/venue/heart-button"
import { GoogleVenueMap } from "@/components/maps/google-venue-map"
import { RelatedVenues } from "@/components/venue/related-venues"
import { VenuePosts } from "@/components/venue/venue-posts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { VENUE_TYPES } from "@/types"
import type { VenueType } from "@/types"
import { MapPin, Users, Phone, Mail, Globe, Heart } from "lucide-react"

async function getVenue(slug: string) {
  try {
    const venue = await db.venue.findUnique({
      where: {
        slug,
        status: { in: ["active", "draft"] },
      },
      include: {
        manager: {
          select: {
            name: true,
            email: true,
            phone: true,
          }
        }
      }
    })
    
    if (!venue) return null
    
    // PostgreSQL returns arrays directly, no need to parse
    return venue
  } catch (error) {
    console.error("Error fetching venue:", error)
    return null
  }
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const venue = await getVenue(slug)

  if (!venue) {
    notFound()
  }

  const venueTypeLabel = venue.venueType ? VENUE_TYPES[venue.venueType as VenueType] || venue.venueType : null

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <VenueGallery images={venue.images} venueName={venue.name} />

            {/* YouTube Video */}
            {venue.videoUrl && (
              <div className="mt-8">
                <h2 className="text-title-3 text-black mb-4">Video presentation</h2>
                <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={venue.videoUrl.replace('watch?v=', 'embed/')}
                    title={`${venue.name} - Video presentation`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Venue Info */}
            <div className="mt-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-title-1 text-black mb-2">{venue.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="h-5 w-5" />
                    <span className="text-body">{venue.address}</span>
                  </div>
                  {venueTypeLabel && (
                    <Badge variant="secondary" className="mb-4">
                      {venueTypeLabel}
                    </Badge>
                  )}
                </div>
                <HeartButton venueId={venue.id} />
              </div>

              {venue.description && (
                <div className="mb-8">
                  <h2 className="text-title-3 text-black mb-4">About the space</h2>
                  <p className="text-body text-gray-700 leading-relaxed">
                    {venue.description}
                  </p>
                </div>
              )}

              {/* Capacity */}
              {(venue.capacitySeated || venue.capacityStanding) && (
                <div className="mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Capacity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold">
                          {Math.max(venue.capacitySeated || 0, venue.capacityStanding || 0)} people
                        </span>
                      </div>
                      {venue.capacitySeated && venue.capacityStanding && (
                        <div className="mt-3 text-sm text-gray-600">
                          <div>Seated: {venue.capacitySeated} people</div>
                          <div>Standing: {venue.capacityStanding} people</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Amenities */}
              {venue.amenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-title-3 text-black mb-4">Amenities and services</h2>
                  <div className="flex flex-wrap gap-2">
                    {venue.amenities.map((amenity: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="mb-8">
                <h2 className="text-title-3 text-black mb-4">Contact information</h2>
                <div className="space-y-3">
                  {venue.contactEmail && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <a 
                        href={`mailto:${venue.contactEmail}`}
                        className="text-body text-blue-600 hover:underline"
                      >
                        {venue.contactEmail}
                      </a>
                    </div>
                  )}
                  {venue.contactPhone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <a 
                        href={`tel:${venue.contactPhone}`}
                        className="text-body text-blue-600 hover:underline"
                      >
                        {venue.contactPhone}
                      </a>
                    </div>
                  )}
                  {venue.websiteUrl && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <a 
                        href={venue.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-body text-blue-600 hover:underline"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Location Map */}
              <div className="mb-8">
                <h2 className="text-title-3 text-black mb-4">Location</h2>
                <GoogleVenueMap 
                  address={venue.address}
                  venueName={venue.name}
                />
              </div>

              {/* Venue Posts */}
              <VenuePosts venueId={venue.id} venueName={venue.name} />
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <CardTitle>Send an inquiry</CardTitle>
                </CardHeader>
                <CardContent>
                  <VenueContactForm venueId={venue.id} venueName={venue.name} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Related Venues */}
        <RelatedVenues 
          currentVenueId={venue.id}
          venueType={venue.venueType}
          address={venue.address}
          amenities={venue.amenities}
        />
      </div>
    </div>
  )
}