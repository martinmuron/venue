import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Building, MessageSquare, Eye, Plus, Calendar, Settings, CreditCard, Users, TrendingUp, Clock } from "lucide-react"

interface VenueManagerDashboardProps {
  data: {
    user: any
    venues: any[]
    stats: {
      totalVenues: number
      activeVenues: number
      totalInquiries: number
    }
  }
}

export function VenueManagerDashboard({ data }: VenueManagerDashboardProps) {
  const { user, venues, stats } = data

  // Mock subscription data - replace with real data
  const subscriptionData = {
    plan: "Premium",
    status: "active",
    daysLeft: 23,
    totalDays: 30,
    nextBillingDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000)
  }

  const progressPercentage = ((subscriptionData.totalDays - subscriptionData.daysLeft) / subscriptionData.totalDays) * 100

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-title-1 text-gray-900 mb-2">Welcome back, {user.name}!</h1>
        <p className="text-body text-gray-600">Manage your venues and subscription</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Total venues</p>
                <p className="text-title-2 text-gray-900">{stats.totalVenues}</p>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Active venues</p>
                <p className="text-title-2 text-gray-900">{stats.activeVenues}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Total inquiries</p>
                <p className="text-title-2 text-gray-900">{stats.totalInquiries}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Subscription</p>
                <p className="text-title-2 text-gray-900">{subscriptionData.daysLeft} days</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Status */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-900 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
              Subscription status
            </CardTitle>
            <Badge variant="default" className="bg-green-100 text-green-800">
              {subscriptionData.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Current plan</p>
              <p className="text-lg font-semibold text-gray-900">{subscriptionData.plan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Time remaining</p>
              <div className="flex items-center space-x-3">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{subscriptionData.daysLeft} days</span>
              </div>
            </div>
            <div className="flex items-end justify-end">
              <Link href="/dashboard/subscription">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage subscription
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Venues */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-gray-900">My venues</CardTitle>
              <Link href="/add-venue">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add venue
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {venues.length === 0 ? (
              <div className="text-center py-8">
                <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-body text-gray-600 mb-4">You don't have any venues yet</p>
                <Link href="/add-venue">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Add first venue</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {venues.slice(0, 3).map((venue: any) => (
                  <div key={venue.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-callout font-medium text-gray-900 mb-1">{venue.name}</h4>
                        <p className="text-caption text-gray-600">
                          {venue.inquiries?.length || 0} inquiries • {venue.capacitySeated || 0} seated capacity
                        </p>
                      </div>
                      <Badge 
                        variant={venue.status === "active" ? "default" : "secondary"}
                        className={venue.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      >
                        {venue.status === "active" ? "Active" : venue.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/venues/${venue.slug}`}>
                        <Button variant="secondary" size="sm" className="text-gray-700 border-gray-300 hover:bg-gray-50">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/dashboard/venue/${venue.id}/edit`}>
                        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                          <Settings className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
                {venues.length > 3 && (
                  <Link href="/dashboard/venues">
                    <Button variant="secondary" size="sm" className="w-full text-gray-700 border-gray-300 hover:bg-gray-50">
                      View all venues ({venues.length})
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-gray-900">Recent inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            {venues.every(v => !v.inquiries?.length) ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-body text-gray-600">You haven't received any inquiries yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {venues
                  .flatMap(venue => 
                    (venue.inquiries || []).map((inquiry: any) => ({
                      ...inquiry,
                      venueName: venue.name
                    }))
                  )
                  .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((inquiry: any) => (
                    <div key={inquiry.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-callout font-medium text-gray-900">{inquiry.name}</h4>
                          <p className="text-caption text-gray-600">{inquiry.venueName}</p>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          New
                        </Badge>
                      </div>
                      <p className="text-caption text-gray-700 mb-3 line-clamp-2">
                        {inquiry.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-caption text-gray-500">
                          {formatDate(new Date(inquiry.createdAt))}
                        </p>
                        <a 
                          href={`mailto:${inquiry.email}`}
                          className="text-caption bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                          Reply
                        </a>
                      </div>
                    </div>
                  ))}
                <Link href="/dashboard/inquiries">
                  <Button variant="secondary" size="sm" className="w-full text-gray-700 border-gray-300 hover:bg-gray-50">
                    View all inquiries
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Profile Management */}
      <Card className="mt-8 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Profile management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Company</label>
                  <p className="text-gray-900">{user.company || "Not specified"}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <p className="text-gray-900">{user.phone || "Not specified"}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <Link href="/dashboard/profile">
                <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white mb-3">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit profile
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="secondary" className="w-full text-gray-700 border-gray-300 hover:bg-gray-50">
                  <Users className="h-4 w-4 mr-2" />
                  Account settings
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="mt-8 bg-white">
        <CardHeader>
          <CardTitle className="text-gray-900">Quick actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Link href="/add-venue">
              <Button variant="secondary" className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50 h-12">
                <Plus className="h-4 w-4 mr-2" />
                Add new venue
              </Button>
            </Link>
            <Link href="/requests">
              <Button variant="secondary" className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50 h-12">
                <Calendar className="h-4 w-4 mr-2" />
                Public orders
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="secondary" className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50 h-12">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </Link>
            <Link href="/dashboard/subscription">
              <Button variant="secondary" className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50 h-12">
                <CreditCard className="h-4 w-4 mr-2" />
                Billing
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}