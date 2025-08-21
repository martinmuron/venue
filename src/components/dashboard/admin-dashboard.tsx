import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building, Calendar, MessageSquare, FileText, Mail } from "lucide-react"

interface AdminDashboardProps {
  data: {
    user: any
    stats: {
      totalUsers: number
      totalVenues: number
      totalEventRequests: number
      totalInquiries: number
    }
  }
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  const { user, stats } = data

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-title-1 text-black mb-2">
          Admin Dashboard
        </h1>
        <p className="text-body text-gray-600">
          Overview of the Venue Fusion platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Total Users</p>
                <p className="text-title-2 text-black">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Total Venues</p>
                <p className="text-title-2 text-black">{stats.totalVenues}</p>
              </div>
              <Building className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Public Requests</p>
                <p className="text-title-2 text-black">{stats.totalEventRequests}</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Total Inquiries</p>
                <p className="text-title-2 text-black">{stats.totalInquiries}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body text-gray-600 mb-4">
              Manage user accounts, roles and permissions.
            </p>
            <Link href="/dashboard/users">
              <Button>Manage Users</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Venue Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body text-gray-600 mb-4">
              Moderate venue listings and manage subscriptions.
            </p>
            <Link href="/dashboard/venues">
              <Button>Manage Venues</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body text-gray-600 mb-4">
              Manage blog articles for SEO and marketing.
            </p>
            <Link href="/admin/blog">
              <Button>Manage Blog</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body text-gray-600 mb-4">
              Track all automated emails sent through Resend.
            </p>
            <Link href="/admin/email-flow">
              <Button>View Email Flow</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/dashboard/users">
              <Button variant="secondary" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Users
              </Button>
            </Link>
            <Link href="/dashboard/venues">
              <Button variant="secondary" className="w-full justify-start">
                <Building className="h-4 w-4 mr-2" />
                Venues
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button variant="secondary" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Blog
              </Button>
            </Link>
            <Link href="/requests">
              <Button variant="secondary" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Public Requests
              </Button>
            </Link>
            <Link href="/dashboard/stats">
              <Button variant="secondary" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Statistics
              </Button>
            </Link>
            <Link href="/admin/email-flow">
              <Button variant="secondary" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email Flow
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}