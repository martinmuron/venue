"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { 
  Building, 
  MapPin, 
  Users, 
  Mail, 
  Phone, 
  Globe, 
  Save, 
  Eye,
  MessageSquare,
  Calendar,
  Settings
} from "lucide-react"

interface VenueEditFormProps {
  venue: any
}

export function VenueEditForm({ venue }: VenueEditFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: venue.name || "",
    description: venue.description || "",
    address: venue.address || "",
    capacitySeated: venue.capacitySeated || "",
    capacityStanding: venue.capacityStanding || "",
    venueType: venue.venueType || "",
    contactEmail: venue.contactEmail || "",
    contactPhone: venue.contactPhone || "",
    websiteUrl: venue.websiteUrl || "",
    status: venue.status || "draft"
  })

  const venueTypes = [
    { value: "conference-hall", label: "Conference Hall" },
    { value: "wedding-venue", label: "Wedding Venue" },
    { value: "corporate-space", label: "Corporate Space" },
    { value: "gallery", label: "Gallery" },
    { value: "restaurant", label: "Restaurant" },
    { value: "hotel", label: "Hotel" },
    { value: "outdoor-space", label: "Outdoor Space" },
    { value: "theater", label: "Theater" },
    { value: "other", label: "Other" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/venues/${venue.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.refresh()
        // Show success message or redirect
      } else {
        console.error("Failed to update venue")
      }
    } catch (error) {
      console.error("Error updating venue:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="space-y-8">
      {/* Venue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Status</p>
                <Badge 
                  variant={venue.status === "active" ? "default" : "secondary"}
                  className={venue.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {venue.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Inquiries</p>
                <p className="text-title-2 text-gray-900">{venue._count.inquiries}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Capacity</p>
                <p className="text-title-2 text-gray-900">{venue.capacitySeated || 0}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption text-gray-500 mb-1">Created</p>
                <p className="text-caption text-gray-900">{formatDate(new Date(venue.createdAt))}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Edit Form */}
        <div className="lg:col-span-2">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Edit Venue Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue Name *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your venue name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      placeholder="Describe your venue, its advantages and possibilities..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <Input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      placeholder="Street and number, city, postal code"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue Type
                    </label>
                    <Select
                      value={formData.venueType}
                      onValueChange={(value) => handleChange("venueType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select venue type" />
                      </SelectTrigger>
                      <SelectContent>
                        {venueTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Capacity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Capacity</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Seated
                      </label>
                      <Input
                        type="number"
                        value={formData.capacitySeated}
                        onChange={(e) => handleChange("capacitySeated", parseInt(e.target.value) || 0)}
                        placeholder="50"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Standing
                      </label>
                      <Input
                        type="number"
                        value={formData.capacityStanding}
                        onChange={(e) => handleChange("capacityStanding", parseInt(e.target.value) || 0)}
                        placeholder="100"
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <Input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => handleChange("contactEmail", e.target.value)}
                      placeholder="contact@venue.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <Input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => handleChange("contactPhone", e.target.value)}
                      placeholder="+420 123 456 789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <Input
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => handleChange("websiteUrl", e.target.value)}
                      placeholder="https://www.venue.com"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Venue Status</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => handleChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="expired">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={() => router.push("/dashboard")}
                    className="text-gray-700 border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent Inquiries */}
        <div>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Nedávné dotazy</CardTitle>
            </CardHeader>
            <CardContent>
              {venue.inquiries.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-body text-gray-600">
                    Zatím žádné dotazy
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {venue.inquiries.slice(0, 5).map((inquiry: any) => (
                    <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">{inquiry.name}</h4>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          Nový
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {inquiry.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {formatDate(new Date(inquiry.createdAt))}
                        </p>
                        <a 
                          href={`mailto:${inquiry.email}`}
                          className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                        >
                          Odpovědět
                        </a>
                      </div>
                    </div>
                  ))}
                  {venue.inquiries.length > 5 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{venue.inquiries.length - 5} dalších dotazů
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-6 bg-white">
            <CardHeader>
              <CardTitle className="text-gray-900">Rychlé akce</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button 
                  variant="secondary" 
                  className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50"
                  onClick={() => window.open(`/prostory/${venue.slug}`, '_blank')}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Zobrazit prostor
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50"
                  onClick={() => router.push("/dashboard/inquiries")}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Všechny dotazy
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full justify-start text-gray-700 border-gray-300 hover:bg-gray-50"
                  onClick={() => router.push("/dashboard")}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}