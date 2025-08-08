import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Settings, 
  Database, 
  Mail, 
  Shield,
  AlertTriangle,
  Info
} from "lucide-react"
import Link from "next/link"

async function getSystemInfo() {
  try {
    const [userCount, venueCount, requestCount] = await Promise.all([
      db.user.count(),
      db.venue.count(),
      db.eventRequest.count(),
    ])

    return {
      userCount,
      venueCount,
      requestCount,
      databaseStatus: "healthy"
    }
  } catch (error) {
    console.error("Error fetching system info:", error)
    return {
      userCount: 0,
      venueCount: 0,
      requestCount: 0,
      databaseStatus: "error"
    }
  }
}

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id || session.user.role !== "admin") {
    redirect("/dashboard")
  }

  const systemInfo = await getSystemInfo()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Settings</h1>
        <p className="text-gray-600 mt-2">System management and platform configuration</p>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            System status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{systemInfo.userCount}</div>
              <div className="text-sm text-green-600">Users</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{systemInfo.venueCount}</div>
              <div className="text-sm text-blue-600">Venues</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-600">{systemInfo.requestCount}</div>
              <div className="text-sm text-purple-600">Requests</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className={`text-2xl font-bold ${
                systemInfo.databaseStatus === "healthy" ? "text-green-600" : "text-red-600"
              }`}>
                {systemInfo.databaseStatus === "healthy" ? "✓" : "✗"}
              </div>
              <div className="text-sm text-gray-600">Database</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Seed database</h3>
              <p className="text-sm text-gray-600 mb-3">Fill the database with sample data (venues, users, blog posts)</p>
              <Link href="/api/admin/seed" target="_blank">
                <Button variant="outline">
                  Open seed endpoint
                </Button>
              </Link>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2 text-red-600 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Dangerous operations
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                These operations can cause data loss. Use with caution.
              </p>
              <div className="space-y-2">
                <Button variant="destructive" disabled>
                  Delete all venues (TODO)
                </Button>
                <Button variant="destructive" disabled>
                  Reset database (TODO)
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="smtp-server">SMTP Server</Label>
              <Input
                id="smtp-server"
                placeholder="smtp.example.com"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="email-from">From Email</Label>
              <Input
                id="email-from"
                placeholder="noreply@venuefusion.com"
                disabled
              />
            </div>
            <Button disabled>Save settings (TODO)</Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="session-timeout">Session timeout (minutes)</Label>
              <Input
                id="session-timeout"
                type="number"
                placeholder="60"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="max-login-attempts">Max login attempts</Label>
              <Input
                id="max-login-attempts"
                type="number"
                placeholder="5"
                disabled
              />
            </div>
            <Button disabled>Save settings (TODO)</Button>
          </div>
        </CardContent>
      </Card>

      {/* Site Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Site settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="site-name">Site name</Label>
              <Input
                id="site-name"
                defaultValue="Venue Fusion"
                disabled
              />
            </div>
            <div>
              <Label htmlFor="site-description">Site description</Label>
              <Textarea id="site-description" defaultValue="Find the perfect venue for your event" disabled />
            </div>
            <div>
              <Label htmlFor="contact-email">Contact email</Label>
              <Input
                id="contact-email"
                defaultValue="info@venuefusion.com"
                disabled
              />
            </div>
            <Button disabled>Save settings (TODO)</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}