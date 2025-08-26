"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowLeft } from "lucide-react"

function PaymentSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (sessionId) {
      // Here you could verify the payment with Stripe
      // For now, we'll just show success
      setVerified(true)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    )
  }

  if (!verified || !sessionId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center p-6">
            <div className="text-red-600 mb-4">
              <CheckCircle className="h-12 w-12 mx-auto" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn't verify your payment. Please try again.
            </p>
            <Button onClick={() => router.push("/add-venue")} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Form
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="text-green-600 mb-4">
              <CheckCircle className="h-16 w-16 mx-auto" />
            </div>
            <CardTitle className="text-2xl text-gray-900">
              Payment Successful!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <p className="text-lg text-gray-700">
                Thank you for your payment!
              </p>
              <p className="text-gray-600">
                You can now complete your venue listing form.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Next steps:</strong>
              </p>
              <ul className="text-sm text-blue-700 mt-2 space-y-1 text-left">
                <li>• Complete the venue form with all details</li>
                <li>• Upload high-quality photos</li>
                <li>• Add YouTube video (optional)</li>
                <li>• Your venue will be reviewed by our team</li>
                <li>• Once approved, it will go live on the platform</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => router.push("/add-venue/form")} 
                className="w-full"
                size="lg"
              >
                Complete Your Venue Form
              </Button>
              <Button 
                variant="outline" 
                onClick={() => router.push("/")} 
                className="w-full"
              >
                Return to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}