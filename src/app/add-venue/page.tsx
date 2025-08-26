"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CreditCard, 
  MapPin, 
  Users, 
  Euro, 
  Upload, 
  Video,
  CheckCircle,
  AlertTriangle,
  X
} from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const paymentSchema = z.object({
  venueName: z.string().min(2, "Venue name must have at least 2 characters"),
  userEmail: z.string().email("Please enter a valid email address"),
})

type PaymentFormData = z.infer<typeof paymentSchema>

function AddVenueContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const canceled = searchParams.get("canceled")
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCanceledAlert, setShowCanceledAlert] = useState(!!canceled)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  })

  const onSubmit = async (data: PaymentFormData) => {
    setIsSubmitting(true)
    
    try {
      // Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          venueName: data.venueName,
          userEmail: data.userEmail,
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirect to Stripe checkout
      const stripe = await stripePromise
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (stripeError) {
        throw new Error(stripeError.message)
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("An error occurred while setting up payment. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-title-1 text-black mb-3 sm:mb-2 leading-tight">
            List Your Venue on VenueFusion
          </h1>
          <p className="text-base sm:text-body text-gray-600 leading-relaxed">
            Join the largest platform for event venues and start receiving bookings from event organizers. 
            Your listing includes professional visibility, inquiry management, and booking tools.
          </p>
        </div>

        {/* Canceled Payment Alert */}
        {showCanceledAlert && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-yellow-800">
                <strong>Payment was canceled.</strong> You can try again below.
              </p>
            </div>
            <button
              onClick={() => setShowCanceledAlert(false)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* What's Included */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">What's Included in Your Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-black">Professional Listing</h3>
                  <p className="text-sm text-gray-600">
                    Full venue profile with photos, videos, and detailed information
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-black">Direct Inquiries</h3>
                  <p className="text-sm text-gray-600">
                    Receive booking inquiries directly from event organizers
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Euro className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-black">Pricing Control</h3>
                  <p className="text-sm text-gray-600">
                    Set your own pricing and availability
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Upload className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-medium text-black">Media Gallery</h3>
                  <p className="text-sm text-gray-600">
                    Upload up to 10 photos and YouTube videos
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <CreditCard className="h-5 w-5 flex-shrink-0" />
              Get Started - $49.99/month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800">
                      <strong>Monthly subscription of $49.99</strong> - Professional venue listing with full features
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      After subscribing, you'll complete your venue details and photos. 
                      Our team will review and approve your listing within 24-48 hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Venue Name *
                </label>
                <Input
                  {...register("venueName")}
                  placeholder="Enter your venue name"
                  className="h-11 sm:h-12"
                />
                {errors.venueName && (
                  <p className="text-sm text-red-600 mt-1">{errors.venueName.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Your Email Address *
                </label>
                <Input
                  type="email"
                  {...register("userEmail")}
                  placeholder="your@email.com"
                  className="h-11 sm:h-12"
                />
                {errors.userEmail && (
                  <p className="text-sm text-red-600 mt-1">{errors.userEmail.message}</p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  We'll use this email for your account and payment receipt
                </p>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 text-base"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Subscribe $49.99/month & Continue
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Secure payment powered by{" "}
                <span className="font-medium text-gray-700">Stripe</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Process Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How it works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-black">Pay & Get Started</h3>
                  <p className="text-sm text-gray-600">
                    Monthly subscription of $49.99 to activate your listing
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-black">Complete Your Profile</h3>
                  <p className="text-sm text-gray-600">
                    Add venue details, photos, pricing, and contact information
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-black">Get Approved</h3>
                  <p className="text-sm text-gray-600">
                    Our team reviews your listing within 24-48 hours
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-black">Start Receiving Bookings</h3>
                  <p className="text-sm text-gray-600">
                    Your venue goes live and you start receiving inquiries
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AddVenuePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <AddVenueContent />
    </Suspense>
  )
}