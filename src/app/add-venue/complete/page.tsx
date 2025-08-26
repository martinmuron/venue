"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Mail, Home } from "lucide-react"

function VenueSubmissionContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const venueName = searchParams.get("venue")

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="text-green-600 mb-4">
              <CheckCircle className="h-16 w-16 mx-auto" />
            </div>
            <CardTitle className="text-2xl text-gray-900">
              Venue Submitted Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              {venueName && (
                <p className="text-lg text-gray-700">
                  <strong>"{venueName}"</strong> has been submitted for review.
                </p>
              )}
              <p className="text-gray-600">
                Thank you for joining VenueFusion! Your venue listing is now under review.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-900">What happens next?</h3>
              </div>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Our team will review your venue details and photos</li>
                <li>• We'll verify all information and ensure quality standards</li>
                <li>• You'll receive an email notification once approved</li>
                <li>• Your venue will go live on the platform within 24-48 hours</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-left">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Account Created</h3>
              </div>
              <p className="text-sm text-green-800">
                Your venue manager account has been created. Once your venue is approved, 
                you can log in to manage your listing, view inquiries, and update your information.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                onClick={() => router.push("/")} 
                className="w-full"
                size="lg"
              >
                <Home className="h-4 w-4 mr-2" />
                Return to Homepage
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push("/login")} 
                className="w-full"
              >
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function VenueSubmissionComplete() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <VenueSubmissionContent />
    </Suspense>
  )
}