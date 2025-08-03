'use client'

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { EVENT_TYPES } from "@/types"
import type { EventType } from "@/types"
import { formatDate } from "@/lib/utils"
import { EventRequestHeartButton } from "@/components/event-request/heart-button"
import { Calendar, Users, MapPin, Euro, Mail, Phone, User, Filter, Search, Clock, X, LogIn } from "lucide-react"

// Force dynamic rendering to avoid caching issues
export const dynamic = 'force-dynamic'

interface EventRequest {
  id: string
  title: string
  description?: string | null
  eventType: string
  eventDate: string
  guestCount: number
  budget?: number | null
  locationPreference?: string | null
  requirements?: string | null
  contactName: string
  contactEmail: string
  contactPhone?: string | null
  createdAt: string
  user: {
    name: string
  }
  favorites?: Array<{ userId: string }>
}

const GUEST_COUNT_RANGES = [
  { label: "All", value: "all" },
  { label: "1-25 people", value: "1-25" },
  { label: "26-50 people", value: "26-50" },
  { label: "51-100 people", value: "51-100" },
  { label: "101-200 people", value: "101-200" },
  { label: "200+ people", value: "200+" },
]

const DATE_RANGES = [
  { label: "All", value: "all" },
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
  { label: "Most recent", value: "recent" },
]

const FAVORITE_FILTERS = [
  { label: "All requests", value: "all" },
  { label: "Only favorites", value: "favorites" },
]

const LOCATIONS = [
  "All",
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ",
  "Philadelphia, PA", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "San Jose, CA",
  "Austin, TX", "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH",
  "Charlotte, NC", "San Francisco, CA", "Indianapolis, IN", "Seattle, WA", "Denver, CO"
]

function EventRequestSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
          <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-3 bg-gray-200 rounded animate-pulse mb-1 w-16 mx-auto" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mx-auto" />
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function EventRequestsPage() {
  const { data: session, status } = useSession()
  const [requests, setRequests] = useState<EventRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    location: "All",
    guestCount: "all",
    dateRange: "all",
    search: "",
    favorites: "all",
  })

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/event-requests')
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests || [])
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredRequests = useMemo(() => {
    let filtered = [...requests]

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(request => 
        request.title.toLowerCase().includes(searchLower) ||
        request.description?.toLowerCase().includes(searchLower) ||
        request.contactName.toLowerCase().includes(searchLower)
      )
    }

    // Filter by location
    if (filters.location !== "All") {
      filtered = filtered.filter(request => 
        request.locationPreference?.includes(filters.location)
      )
    }

    // Filter by guest count
    if (filters.guestCount !== "all") {
      const [min, max] = filters.guestCount.split("-").map(n => n === "+" ? Infinity : parseInt(n))
      filtered = filtered.filter(request => {
        const guests = request.guestCount
        if (max === undefined) return guests >= min
        return guests >= min && guests <= max
      })
    }

    // Filter by date range
    if (filters.dateRange !== "all") {
      const now = new Date()
      const filterDate = new Date()
      
      switch (filters.dateRange) {
        case "7days":
          filterDate.setDate(now.getDate() - 7)
          break
        case "30days":
          filterDate.setDate(now.getDate() - 30)
          break
        case "recent":
          filterDate.setDate(now.getDate() - 3)
          break
      }
      
      filtered = filtered.filter(request => 
        new Date(request.createdAt) >= filterDate
      )
    }

    // Filter by favorites (only if user is logged in and favorites data is available)
    if (filters.favorites === "favorites" && session?.user?.id) {
      filtered = filtered.filter(request => 
        request.favorites?.some(fav => fav.userId === session.user.id) || false
      )
    }

    return filtered
  }, [requests, filters])

  const clearFilters = () => {
    setFilters({
      location: "All",
      guestCount: "all", 
      dateRange: "all",
      search: "",
      favorites: "all",
    })
  }

  const hasActiveFilters = filters.location !== "All" || 
                          filters.guestCount !== "all" || 
                          filters.dateRange !== "all" || 
                          filters.search !== "" ||
                          filters.favorites !== "all"

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-title-1 text-black mb-4">Public Contracts</h1>
            <p className="text-sm sm:text-body text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0">
              Current requests for event spaces. Contact the organizers directly
              through the provided contact details.
            </p>
          </div>
          
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <EventRequestSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-title-1 text-black mb-4">Public Contracts</h1>
          <p className="text-sm sm:text-body text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-0">
            Current requests for event spaces. Contact the organizers directly
            through the provided contact details.
          </p>
          <Link href="/requests/new">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 w-full sm:w-auto rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">
              Add request
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto text-gray-600 hover:text-gray-900"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear filters
                </Button>
              )}
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${session ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search in requests
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Name, description, contact..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Guest Count Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of guests
                </label>
                <Select value={filters.guestCount} onValueChange={(value) => setFilters(prev => ({ ...prev, guestCount: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    {GUEST_COUNT_RANGES.map(range => (
                      <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date added
                </label>
                <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({ ...prev, dateRange: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_RANGES.map(range => (
                      <SelectItem key={range.value} value={range.value}>{range.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Favorites Filter - Only show for authenticated users */}
              {session && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Favorites
                  </label>
                  <Select value={filters.favorites} onValueChange={(value) => setFilters(prev => ({ ...prev, favorites: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter favorites" />
                    </SelectTrigger>
                    <SelectContent>
                      {FAVORITE_FILTERS.map(filter => (
                        <SelectItem key={filter.value} value={filter.value}>{filter.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredRequests.length} of {requests.length} requests
          </p>
          {hasActiveFilters && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Active filters
            </Badge>
          )}
        </div>

        {/* Event Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-title-3 text-black mb-4">
              {requests.length === 0 ? "No active requests" : "No results"}
            </h3>
            <p className="text-body text-gray-600 mb-6 px-4">
              {requests.length === 0 
                ? "There are currently no event requests available."
                : "Try adjusting the filters to see more results."
              }
            </p>
            {requests.length === 0 ? (
              <Link href="/requests/new">
                <Button className="bg-black text-white hover:bg-gray-800 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl">Add first request</Button>
              </Link>
            ) : (
              <Button onClick={clearFilters} variant="outline">
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRequests.map((request: EventRequest) => {
              const eventTypeLabel = EVENT_TYPES[request.eventType as EventType] || request.eventType
              
              return (
                <Card key={request.id} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 font-medium px-3 py-1 text-sm">
                            {eventTypeLabel}
                          </Badge>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(new Date(request.createdAt))}
                          </div>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                          {request.title}
                        </h2>
                        {request.description && (
                          <p className="text-base text-gray-600 leading-relaxed line-clamp-2">
                            {request.description}
                          </p>
                        )}
                      </div>
                      
                      {/* Heart Button for logged-in users */}
                      {session?.user?.id && (
                        <div className="flex-shrink-0">
                          <EventRequestHeartButton 
                            eventRequestId={request.id}
                            className="shadow-sm"
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <Calendar className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <p className="text-xs text-blue-600 font-medium">Event date</p>
                        <p className="text-sm font-semibold text-blue-900">{formatDate(new Date(request.eventDate))}</p>
                      </div>
                      
                      <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                        <Users className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <p className="text-xs text-green-600 font-medium">Number of guests</p>
                        <p className="text-sm font-semibold text-green-900">{request.guestCount} people</p>
                      </div>
                      
                      {request.budget && (
                        <div className="text-center p-3 bg-amber-50 rounded-xl border border-amber-100">
                          <Euro className="h-5 w-5 text-amber-600 mx-auto mb-1" />
                          <p className="text-xs text-amber-600 font-medium">Budget</p>
                          <p className="text-sm font-semibold text-amber-900">${request.budget.toLocaleString()}</p>
                        </div>
                      )}
                      
                      {request.locationPreference && (
                        <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                          <MapPin className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                          <p className="text-xs text-purple-600 font-medium">Location</p>
                          <p className="text-sm font-semibold text-purple-900">{request.locationPreference}</p>
                        </div>
                      )}
                    </div>

                    {/* Requirements */}
                    {request.requirements && (
                      <div className="mb-6">
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                          <h4 className="text-sm font-semibold text-amber-800 mb-2">Special requirements</h4>
                          <p className="text-sm text-amber-700 leading-relaxed line-clamp-2">{request.requirements}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Contact Info */}
                    <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-4 border border-slate-200">
                      <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 ${!session ? 'blur-sm' : ''}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center">
                            <User className="h-5 w-5 text-slate-600" />
                          </div>
                          <span className="font-medium text-slate-900">{request.contactName}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          <a 
                            href={session ? `mailto:${request.contactEmail}` : '#'}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                            onClick={!session ? (e) => e.preventDefault() : undefined}
                          >
                            <Mail className="h-4 w-4" />
                            Email
                          </a>
                          
                          {request.contactPhone && (
                            <a 
                              href={session ? `tel:${request.contactPhone}` : '#'}
                              className="inline-flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                              onClick={!session ? (e) => e.preventDefault() : undefined}
                            >
                              <Phone className="h-4 w-4" />
                              Phone
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Login overlay for non-authenticated users */}
                      {!session && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] rounded-xl flex items-center justify-center p-2">
                          <div className="flex flex-col sm:flex-row items-center gap-3 p-4 text-center sm:text-left">
                            <LogIn className="h-6 w-6 text-gray-600 flex-shrink-0" />
                            <p className="text-sm font-medium text-gray-900">
                              Log in to view contact details
                            </p>
                            <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0 w-full sm:w-auto">
                              <Link href="/login" className="w-full sm:w-auto">
                                <Button size="sm" className="bg-black text-white hover:bg-gray-800 rounded-lg w-full">
                                  Log in
                                </Button>
                              </Link>
                              <Link href="/register" className="w-full sm:w-auto">
                                <Button variant="outline" size="sm" className="rounded-lg border-gray-300 w-full">
                                  Register
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}