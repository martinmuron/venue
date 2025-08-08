"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EVENT_TYPES, PRAGUE_DISTRICTS, BUDGET_RANGES } from "@/types"

const eventRequestSchema = z.object({
  title: z.string().min(5, "Event title must be at least 5 characters"),
  description: z.string().optional(),
  eventType: z.string().min(1, "Please select event type"),
  eventDate: z.string().optional(),
  guestCount: z.coerce.number().min(1, "Guest count must be at least 1").optional(),
  budgetRange: z.string().optional(),
  locationPreference: z.string().optional(),
  requirements: z.string().optional(),
  contactName: z.string().min(2, "Name is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().optional(),
})

type EventRequestFormData = z.infer<typeof eventRequestSchema>

export function EventRequestForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventRequestFormData>({
    resolver: zodResolver(eventRequestSchema),
    defaultValues: {
      contactName: session?.user?.name || "",
      contactEmail: session?.user?.email || "",
    },
  })

  const onSubmit = async (data: EventRequestFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/event-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          eventDate: data.eventDate ? new Date(data.eventDate) : null,
        }),
      })

      if (response.ok) {
        router.push("/requests?success=true")
      } else {
        throw new Error("Failed to create event request")
      }
    } catch (error) {
      console.error("Error creating event request:", error)
      alert("An error occurred while creating the request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label className="block text-headline font-semibold text-black mb-3">
          Event Title *
        </label>
        <Input
          {...register("title")}
          placeholder="e.g. Corporate Christmas Party"
          className="text-body"
        />
        {errors.title && (
          <p className="text-callout text-red-600 mt-2 font-medium">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-headline font-semibold text-black mb-3">
          Event Description
        </label>
        <Textarea
          {...register("description")}
          placeholder="Describe your event, atmosphere, requirements..."
          rows={4}
          className="text-body rounded-2xl border-2 min-h-[120px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-headline font-semibold text-black mb-3">
            Event Type *
          </label>
          <Select onValueChange={(value) => setValue("eventType", value)} defaultValue="">
            <SelectTrigger className="text-body">
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(EVENT_TYPES).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.eventType && (
            <p className="text-callout text-red-600 mt-2 font-medium">{errors.eventType.message}</p>
          )}
        </div>

        <div>
          <label className="block text-headline font-semibold text-black mb-3">
            Event Date
          </label>
          <Input
            type="date"
            {...register("eventDate")}
            className="text-body"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-headline font-semibold text-black mb-3">
            Number of Guests
          </label>
          <Input
            type="number"
            {...register("guestCount")}
            placeholder="50"
            min="1"
            className="text-body"
          />
          {errors.guestCount && (
            <p className="text-callout text-red-600 mt-2 font-medium">{errors.guestCount.message}</p>
          )}
        </div>

        <div>
          <label className="block text-headline font-semibold text-black mb-3">
            Budget
          </label>
          <Select onValueChange={(value) => setValue("budgetRange", value)} defaultValue="">
            <SelectTrigger className="text-body">
              <SelectValue placeholder="Select budget" />
            </SelectTrigger>
            <SelectContent>
              {BUDGET_RANGES.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-headline font-semibold text-black mb-3">
          Preferred Location
        </label>
        <Select onValueChange={(value) => setValue("locationPreference", value)} defaultValue="">
          <SelectTrigger className="text-body">
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            {PRAGUE_DISTRICTS.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-headline font-semibold text-black mb-3">
          Special Requirements
        </label>
        <Textarea
          {...register("requirements")}
          placeholder="Parking spaces, catering, equipment, accessibility..."
          rows={3}
          className="text-body rounded-2xl border-2 min-h-[100px]"
        />
      </div>

      <div className="border-t-2 border-gray-100 pt-8">
        <h3 className="text-title-2 font-bold text-black mb-4">
          Contact Information
        </h3>
        <p className="text-body text-gray-600 mb-6 leading-relaxed">
          This information will be publicly displayed so venue operators can contact you.
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-headline font-semibold text-black mb-3">
              Name *
            </label>
            <Input
              {...register("contactName")}
              placeholder="Your name"
              className="text-body"
            />
            {errors.contactName && (
              <p className="text-callout text-red-600 mt-2 font-medium">{errors.contactName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-headline font-semibold text-black mb-3">
                Email *
              </label>
              <Input
                type="email"
                {...register("contactEmail")}
                placeholder="your@email.com"
                className="text-body"
              />
              {errors.contactEmail && (
                <p className="text-callout text-red-600 mt-2 font-medium">{errors.contactEmail.message}</p>
              )}
            </div>

            <div>
              <label className="block text-headline font-semibold text-black mb-3">
                Phone
              </label>
              <Input
                type="tel"
                {...register("contactPhone")}
                placeholder="+420 123 456 789"
                className="text-body"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-8">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
          className="flex-1 py-4 text-body font-semibold rounded-2xl"
        >
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="flex-1 py-4 text-body font-semibold rounded-2xl bg-black text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create Request"}
        </Button>
      </div>

      <p className="text-callout text-gray-500 text-center mt-6 leading-relaxed">
        The request will be active for 30 days and then automatically removed.
      </p>
    </form>
  )
}