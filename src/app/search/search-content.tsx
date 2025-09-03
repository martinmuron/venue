'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

interface Venue {
  id: string
  name: string
  location: string
  capacity: number
  priceRange: string
  image: string
  description: string
}

export default function SearchContent() {
  const searchParams = useSearchParams()
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '')

  useEffect(() => {
    // Simulate fetching venues data
    setTimeout(() => {
      const mockVenues: Venue[] = [
        {
          id: '1',
          name: 'Grand Conference Center',
          location: 'Prague, Czech Republic',
          capacity: 500,
          priceRange: '€2000-5000',
          image: '/api/placeholder/400/300',
          description: 'Modern conference center with state-of-the-art facilities'
        },
        {
          id: '2',
          name: 'Historic Manor House',
          location: 'Brno, Czech Republic', 
          capacity: 150,
          priceRange: '€1500-3000',
          image: '/api/placeholder/400/300',
          description: 'Elegant historic venue perfect for weddings and formal events'
        },
        {
          id: '3',
          name: 'Rooftop Terrace Venue',
          location: 'Ostrava, Czech Republic',
          capacity: 100,
          priceRange: '€800-2000',
          image: '/api/placeholder/400/300',
          description: 'Stunning rooftop venue with panoramic city views'
        }
      ]
      setVenues(mockVenues)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredVenues = venues.filter(venue =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex gap-6">
              <div className="w-48 h-32 bg-gray-300 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search venues by name or location..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {filteredVenues.length} venues found
            {searchQuery && ` for "${searchQuery}"`}
          </h2>
        </div>

        {filteredVenues.map((venue) => (
          <div key={venue.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
              <div className="relative w-full sm:w-48 h-48 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{venue.name}</h3>
                <p className="text-gray-600 mb-2">{venue.location}</p>
                <p className="text-gray-700 mb-3 line-clamp-2">{venue.description}</p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Capacity: {venue.capacity} guests</p>
                    <p className="text-sm font-semibold text-blue-600">{venue.priceRange}</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredVenues.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No venues found matching your search.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}