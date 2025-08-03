"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "next-auth/react"
import Link from "next/link"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  guestCount: z.coerce.number().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface VenueContactFormProps {
  venueId: string
  venueName: string
}

export function VenueContactForm({ venueId, venueName }: VenueContactFormProps) {
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/venues/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          venueId,
          eventDate: data.eventDate ? new Date(data.eventDate) : null,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        reset()
      } else {
        throw new Error("Failed to send inquiry")
      }
    } catch (error) {
      console.error("Error sending inquiry:", error)
      alert("An error occurred while sending the inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-title-3 text-black mb-2">Inquiry sent!</h3>
          <p className="text-body text-gray-600 mb-4">
            Your inquiry has been successfully sent. The operator of {venueName} will contact you shortly.
          </p>
          <Button 
            variant="secondary" 
            onClick={() => setIsSubmitted(false)}
          >
            Send another inquiry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${!session ? 'blur-sm pointer-events-none' : ''}`}>
        <div>
          <label className="block text-callout font-medium text-black mb-2">
            Name *
          </label>
          <Input
            {...register("name")}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-caption text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-callout font-medium text-black mb-2">
            Email *
          </label>
          <Input
            type="email"
            {...register("email")}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-caption text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-callout font-medium text-black mb-2">
            Phone
          </label>
          <Input
            type="tel"
            {...register("phone")}
            placeholder="+420 123 456 789"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-callout font-medium text-black mb-2">
              Event Date
            </label>
            <Input
              type="date"
              {...register("eventDate")}
            />
          </div>

          <div>
            <label className="block text-callout font-medium text-black mb-2">
              Number of Guests
            </label>
            <Input
              type="number"
              {...register("guestCount")}
              placeholder="50"
              min="1"
            />
          </div>
        </div>

        <div>
          <label className="block text-callout font-medium text-black mb-2">
            Message *
          </label>
          <Textarea
            {...register("message")}
            placeholder="Describe your event and requirements..."
            rows={4}
          />
          {errors.message && (
            <p className="text-caption text-red-600 mt-1">{errors.message.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </Button>

        <p className="text-caption text-gray-500">
          By sending, you agree to share your contact information with the venue operator.
        </p>
      </form>

      {!session && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg border-2 border-black max-w-sm">
            <h3 className="text-lg font-bold text-black mb-4">
              Sign in to send inquiry
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              To contact the venue owner, you must first sign in or register.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/prihlaseni">
                <Button className="w-full bg-black text-white hover:bg-gray-800 transition-all duration-200 font-medium rounded-xl">
                  Sign In
                </Button>
              </Link>
              <Link href="/registrace">
                <Button variant="outline" className="w-full border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200 font-medium rounded-xl">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}